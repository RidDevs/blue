// server.js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const ethers = require("ethers");
const admin = require("firebase-admin");

const {
  RPC_URL,
  DEPLOYER_PRIVATE_KEY,
  MASTER_KEY,
  CONTRACT_ADDRESS,
  PORT = 3000,
} = process.env;

if (!RPC_URL || !DEPLOYER_PRIVATE_KEY || !MASTER_KEY || !CONTRACT_ADDRESS) {
  console.error("Missing required env vars. See README in message.");
  process.exit(1);
}

/** ---------- init Firebase Admin ---------- **/
if (!admin.apps.length) {
  // Use service account from env variables (recommended)
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // Replace escaped newlines
      privateKey: process.env.FIREBASE_PRIVATE_KEY
        ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
        : undefined,
    }),
  });
}
const db = admin.firestore();

/** ---------- init ethers provider & deployer signer ---------- **/
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
const deployerWallet = new ethers.Wallet(DEPLOYER_PRIVATE_KEY, provider);

// load ABI - you can either require a JSON file or paste the ABI array in env
const CONTRACT_ABI = JSON.parse(process.env.CONTRACT_ABI_JSON || "[]");
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, deployerWallet);

/** ---------- Express ---------- **/
const app = express();
app.use(cors());
app.use(bodyParser.json());

/** Simple admin auth middleware (replace with real auth) */
function adminAuth(req, res, next) {
  const token = req.headers["x-admin-token"];
  // For MVP, compare token to MASTER_KEY or another env token.
  if (token && token === process.env.ADMIN_API_TOKEN) return next();
  return res.status(401).json({ error: "Unauthorized" });
}

/** Create custodial wallet for farmer (if not exists) */
app.post("/create-farmer-wallet", adminAuth, async (req, res) => {
  try {
    const { farmerId, name } = req.body;
    if (!farmerId) return res.status(400).json({ error: "farmerId required" });

    const farmerDoc = db.collection("farmers").doc(farmerId);
    const snap = await farmerDoc.get();
    if (snap.exists) return res.json({ message: "Already exists", data: snap.data() });

    // generate wallet
    const wallet = ethers.Wallet.createRandom();
    // encrypt keystore JSON with MASTER_KEY
    const keystoreJson = await wallet.encrypt(MASTER_KEY);

    const data = {
      name: name || null,
      walletAddress: wallet.address,
      keystore: keystoreJson,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    await farmerDoc.set(data);

    return res.json({ message: "wallet_created", walletAddress: wallet.address });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "server_error", details: err.toString() });
  }
});

/** Mint credits to given farmer (project verification step) */
app.post("/mint", adminAuth, async (req, res) => {
  try {
    const { projectId, farmerId, amount } = req.body;
    if (!projectId || !farmerId || !amount) return res.status(400).json({ error: "projectId, farmerId, amount required" });

    // lookup farmer
    const farmerDoc = await db.collection("farmers").doc(farmerId).get();
    if (!farmerDoc.exists) return res.status(404).json({ error: "farmer not found" });

    const farmer = farmerDoc.data();
    const recipient = farmer.walletAddress;
    if (!recipient) return res.status(400).json({ error: "farmer has no walletAddress" });

    // Convert amount to token units if your token has decimals (here we assume 0 decimals / simple integer)
    const mintAmount = ethers.BigNumber.from(Math.floor(amount).toString());

    // Call contract mint (deployer account must be owner in contract)
    const tx = await contract.mint(recipient, mintAmount);
    console.log("mint tx submitted:", tx.hash);
    // wait 1 confirmation
    const receipt = await tx.wait(1);
    console.log("mint confirmed:", receipt.transactionHash);

    // Update project doc and write audit
    const txHash = receipt.transactionHash;
    const projectRef = db.collection("projects").doc(projectId);
    await projectRef.update({
      creditsGenerated: admin.firestore.FieldValue.increment(Number(amount)),
      blockchainTx: txHash,
      // optionally update status etc
    });

    // write audit collection
    await db.collection("audit").add({
      type: "mint",
      projectId,
      farmerId,
      amount,
      to: recipient,
      txHash,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.json({ message: "minted", txHash });
  } catch (err) {
    console.error("mint error", err);
    return res.status(500).json({ error: "mint_failed", details: err.toString() });
  }
});

/** Helper: Get on-chain audit (reads events or audit collection) */
app.get("/audit", adminAuth, async (req, res) => {
  try {
    // simple example: return last 50 audit docs
    const snaps = await db.collection("audit").orderBy("timestamp", "desc").limit(50).get();
    const items = snaps.docs.map(d => ({ id: d.id, ...d.data() }));
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.toString() });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

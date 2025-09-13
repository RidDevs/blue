const functions = require("firebase-functions");
const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp();
}
const db = admin.firestore();

/**
 * Admin approves a submission → creates a credit batch
 */
exports.approveSubmission = functions.https.onCall(async (data, context) => {
  if (!context.auth || context.auth.token.role !== "admin") {
    throw new functions.https.HttpsError("permission-denied", "Admins only");
  }

  const { submissionId, tonnage, vintageYear } = data;
  const batchRef = db.collection("creditBatches").doc();

  // TODO: integrate with Solana minting service
  const fakeMintAddress = "So11111111111111111111111111111111111111112";

  await batchRef.set({
    submissionId,
    tonnage,
    vintageYear,
    onchainMintAddress: fakeMintAddress,
    issuanceStatus: "pending",
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  await db.collection("submissions").doc(submissionId).update({
    adminStatus: "approved",
    approvedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return { batchId: batchRef.id, mintAddress: fakeMintAddress };
});

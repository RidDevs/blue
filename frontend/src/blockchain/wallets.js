import { ethers } from "ethers";
import CryptoJS from "crypto-js"; // to encrypt private key

// Secret for encryption (store safely in .env)
const SECRET = import.meta.env.VITE_WALLET_SECRET;

// Create a new wallet for a farmer
export function createCustodialWallet() {
  const wallet = ethers.Wallet.createRandom();
  const encryptedPrivateKey = CryptoJS.AES.encrypt(wallet.privateKey, SECRET).toString();

  return {
    address: wallet.address,
    encryptedPrivateKey, // store in Firestore
  };
}

// Decrypt private key when needed
export function decryptPrivateKey(encryptedKey) {
  const bytes = CryptoJS.AES.decrypt(encryptedKey, SECRET);
  return bytes.toString(CryptoJS.enc.Utf8);
}

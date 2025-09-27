import { ethers } from "ethers";  // instead of import * as ethers

import CarbonCreditABI from "./CarbonCredit.json";

// Vite env variable
const CONTRACT_ADDRESS = import.meta.env.VITE_CARBON_CREDIT_ADDRESS;

// Check MetaMask
if (!window.ethereum) {
  alert("MetaMask not found!");
}

const provider = new ethers.providers.Web3Provider(window.ethereum);

export async function connectWallet() {
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  return signer;
}

export async function getContractWithSigner() {
  const signer = await connectWallet();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CarbonCreditABI.abi, signer);
  return contract;
}

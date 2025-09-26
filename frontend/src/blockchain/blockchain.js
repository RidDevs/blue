import { ethers } from "ethers";
import CarbonCreditABI from "./abis/CarbonCredit.json";

// Hardcoded for now, replace with actual deployed address
const CONTRACT_ADDRESS = "0xYourContractAddressHere";

export const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
export const contract = new ethers.Contract(CONTRACT_ADDRESS, CarbonCreditABI, provider);

export const adminWallet = new ethers.Wallet(process.env.ADMIN_PRIVATE_KEY, provider);
export const contractWithSigner = contract.connect(adminWallet);

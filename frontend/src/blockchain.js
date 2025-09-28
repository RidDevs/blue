import { ethers } from "ethers";
import CarbonCreditAbi from "./abis/CarbonCredit.json";

const RPC_URL = process.env.REACT_APP_SEPOLIA_RPC_URL;
const ADMIN_PRIVATE_KEY = process.env.REACT_APP_ADMIN_PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.REACT_APP_CARBON_CREDIT_ADDRESS;

const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
const signer = new ethers.Wallet(ADMIN_PRIVATE_KEY, provider);

export const contractWithSigner = new ethers.Contract(
  CONTRACT_ADDRESS,
  CarbonCreditAbi,
  signer
);

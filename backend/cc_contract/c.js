require("dotenv").config();

console.log("SEPOLIA_RPC_URL:", process.env.SEPOLIA_RPC_URL);
console.log("SEPOLIA_PRIVATE_KEY:", process.env.SEPOLIA_PRIVATE_KEY ? "FOUND" : "MISSING");

import { useState, useEffect } from "react";
import blockchainService from "../blockchain/blockchain";

const BlockchainStats = ({ userRole, userAddress }) => {
  const [stats, setStats] = useState({
    walletBalance: "0",
    totalTransactions: 0,
    blockchainStatus: "disconnected",
    userCredits: 0,
  });

  useEffect(() => {
    loadBlockchainStats();
  }, [userAddress]);

  const loadBlockchainStats = async () => {
    if (!userAddress) return;

    try {
      const balance = await blockchainService.getBalance(userAddress);
      const transactions =
        await blockchainService.getTransactionHistory(userAddress);

      let userCredits = 0;
      if (userRole === "farmer") {
        userCredits = await blockchainService.getFarmerCredits(userAddress);
      } else if (userRole === "buyer") {
        userCredits = await blockchainService.getBuyerCredits(userAddress);
      }

      setStats({
        walletBalance: parseFloat(balance).toFixed(4),
        totalTransactions: transactions.length,
        blockchainStatus: "connected",
        userCredits: userCredits,
      });
    } catch (error) {
      console.error("Failed to load blockchain stats:", error);
      setStats({
        walletBalance: "0",
        totalTransactions: 0,
        blockchainStatus: "disconnected",
        userCredits: 0,
      });
    }
  };

  const getStatusColor = (status) => {
    return status === "connected" ? "#10b981" : "#ef4444";
  };

  return (
    <div className="blockchain-stats-section">
      <div className="blockchain-stats">
        <h3>Blockchain Status</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{stats.walletBalance} ETH</div>
            <div className="stat-label">Wallet Balance</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.userCredits}</div>
            <div className="stat-label">Carbon Credits</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.totalTransactions}</div>
            <div className="stat-label">Transactions</div>
          </div>
          <div className="stat-card">
            <div
              className="stat-number"
              style={{ color: getStatusColor(stats.blockchainStatus) }}
            >
              {stats.blockchainStatus === "connected" ? "✓" : "✗"}
            </div>
            <div className="stat-label">Blockchain</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockchainStats;

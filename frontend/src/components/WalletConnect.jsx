import { useState, useEffect } from "react";

const WalletConnect = () => {
  const [account, setAccount] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        setIsConnected(true);
      } catch (error) {
        alert("Connection failed: " + error.message);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  useEffect(() => {
    if (window.ethereum?.selectedAddress) {
      setAccount(window.ethereum.selectedAddress);
      setIsConnected(true);
    }

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
        } else {
          setAccount("");
          setIsConnected(false);
        }
      });
    }
  }, []);

  return (
    <div
      className="wallet-section"
      style={{ display: "flex", alignItems: "center", gap: "10px" }}
    >
      {!isConnected ? (
        <button
          onClick={connectWallet}
          style={{
            backgroundColor: "#28a745", // Green background
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            transition: "all 0.3s ease",
            fontFamily: "inherit",
            height: "auto",
            lineHeight: "1.2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: "translateY(0)",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
            e.target.style.backgroundColor = "#218838"; // Darker green on hover
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
            e.target.style.backgroundColor = "#28a745"; // Original green
          }}
        >
          Connect Wallet
        </button>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "transparent",
            padding: "5px 10px",
            borderRadius: "5px",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(10px)",
            fontFamily: "inherit",
            height: "auto",
            lineHeight: "1.2",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              color: "#333",
              fontWeight: "500",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "150px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {account.substring(0, 6)}...{account.substring(account.length - 4)}
          </span>
          <button
            onClick={() => {
              setAccount("");
              setIsConnected(false);
            }}
            style={{
              backgroundColor: "#dc3545", // Red background
              color: "white", // White text
              border: "none", // No border
              padding: "4px 8px",
              borderRadius: "3px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "500",
              transition: "all 0.3s ease",
              fontFamily: "inherit",
              height: "24px",
              lineHeight: "1.2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: "translateY(0)",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
              e.target.style.backgroundColor = "#c82333"; // Darker red on hover
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
              e.target.style.backgroundColor = "#dc3545"; // Original red
            }}
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;

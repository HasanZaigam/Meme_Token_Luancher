import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import WalletConnect from "./components/WalletConnect";
import TokenCreation from "./components/TokenCreation";
import TokenList from "./components/TokenList";
import "./App.css";

function App() {
  const [wallet, setWallet] = useState(null);

  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          {/* Left-aligned navigation links */}
          <div className="nav-links">
            <Link to="/">🏠 Home</Link> 
            <Link to="/create">➕ Create Token</Link> 
            <Link to="/tokens">📜 Token List</Link>
          </div>

          {/* Right-aligned Wallet Connect Button */}
          <div className="wallet-container">
            {wallet ? (
              <button className="wallet-connected">
                {wallet.address.substring(0, 6)}...{wallet.address.slice(-4)}
              </button>
            ) : (
              <WalletConnect onWalletConnected={setWallet} />
            )}
          </div>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/" element={<h1>🚀 Welcome to MemeCoin Creator</h1>} />
            <Route path="/create" element={<TokenCreation signer={wallet?.signer} />} />
            <Route path="/tokens" element={<TokenList provider={wallet?.provider} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

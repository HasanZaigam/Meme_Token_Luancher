import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import WalletConnect from "./components/WalletConnect";
import TokenCreation from "./components/TokenCreation";
import TokenList from "./components/TokenList";

function App() {
  const [wallet, setWallet] = useState(null);

  return (
    <Router>
      <div className="p-4">
        <WalletConnect onWalletConnected={setWallet} />

        <nav>
          <Link to="/">Home</Link> | 
          <Link to="/create">Create Token</Link> | 
          <Link to="/tokens">Token List</Link>
        </nav>

        <Routes>
          <Route path="/create" element={<TokenCreation signer={wallet?.signer} />} />
          <Route path="/tokens" element={<TokenList provider={wallet?.provider} />} />
          <Route path="/" element={<h1>Welcome to the Token Platform</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

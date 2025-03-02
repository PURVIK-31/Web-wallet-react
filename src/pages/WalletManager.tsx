import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Solana from "../components/Solana";
import { Eth } from "../components/Eth";

interface LocationState {
  mnemonic: string;
}

const WalletManager: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mnemonic, setMnemonic] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"solana" | "ethereum">("solana");
  const [showSeed, setShowSeed] = useState<boolean>(false);
  const [animateReveal, setAnimateReveal] = useState<boolean>(false);

  useEffect(() => {
    // Get the mnemonic from the location state
    const state = location.state as LocationState;
    if (!state || !state.mnemonic) {
      // If no mnemonic is found, redirect back to the seed generation page
      navigate("/");
      return;
    }
    setMnemonic(state.mnemonic);
  }, [location, navigate]);

  const toggleSeedVisibility = () => {
    if (!showSeed) {
      setAnimateReveal(true);
      setShowSeed(true);
    } else {
      setShowSeed(false);
      setAnimateReveal(false);
    }
  };

  if (!mnemonic) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white">
        <p>Loading wallet information...</p>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 animate-fadeIn">
          Wallet Manager
        </h1>

        <div className="bg-gray-900 rounded-lg p-4 mb-6 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20">
          <h2 className="text-xl mb-2">Seed Phrase</h2>
          <div className="relative">
            <div
              className={`bg-gray-800 p-3 rounded-md font-mono text-sm break-words border border-gray-600 transition-all duration-300 ${
                animateReveal ? "animate-fadeIn" : ""
              }`}
            >
              {showSeed ? (
                mnemonic
              ) : (
                <div className="flex items-center justify-center h-8">
                  <span className="text-gray-500">
                    ••••••••••••••••••••••••••
                  </span>
                </div>
              )}
            </div>
            <button
              onClick={toggleSeedVisibility}
              className="mt-2 flex items-center bg-blue-700 hover:bg-blue-600 text-white text-sm py-1 px-3 rounded-md transition-all duration-200 transform hover:scale-105"
            >
              <span className="mr-1">{showSeed ? "Hide" : "Show"} Seed</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transition-transform duration-300 ${
                  showSeed ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>
          </div>
          <p className="text-xs mt-2 text-gray-400">
            Remember to keep this seed phrase secure. Never share it with
            anyone.
          </p>
        </div>

        <div className="mb-6">
          <div className="flex border-b border-gray-700">
            <button
              className={`py-2 px-4 transition-all duration-200 ${
                activeTab === "solana"
                  ? "text-blue-400 border-b-2 border-blue-400"
                  : "text-gray-400 hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("solana")}
            >
              Solana Wallets
            </button>
            <button
              className={`py-2 px-4 transition-all duration-200 ${
                activeTab === "ethereum"
                  ? "text-blue-400 border-b-2 border-blue-400"
                  : "text-gray-400 hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("ethereum")}
            >
              Ethereum Wallets
            </button>
          </div>
        </div>

        <div className="wallet-content animate-fadeIn">
          {activeTab === "solana" && <Solana mnemonic={mnemonic} />}
          {activeTab === "ethereum" && <Eth mnemonic={mnemonic} />}
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="mt-8 bg-red-700 self-center hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-all duration-200 transform hover:scale-105"
          >
            Generate New Seed Phrase
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletManager;

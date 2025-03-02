import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Solana from "../components/Solana";
import { Eth } from "../components/Eth";
import {
  Eye,
  EyeOff,
  ShieldCheck,
  RefreshCw,
  AlertTriangle,
  ArrowLeft,
  Copy,
  CheckCircle,
} from "lucide-react";

interface LocationState {
  mnemonic: string;
}

const WalletManager: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mnemonic, setMnemonic] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"solana" | "ethereum">("solana");
  const [showSeed, setShowSeed] = useState<boolean>(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [tabsRect, setTabsRect] = useState({
    solana: { width: 0, left: 0 },
    ethereum: { width: 0, left: 0 },
  });

  // Animation states
  const [seedContainerHovered, setSeedContainerHovered] =
    useState<boolean>(false);

  // Initialize component and get mnemonic
  useEffect(() => {
    const state = location.state as LocationState;
    if (!state || !state.mnemonic) {
      navigate("/");
      return;
    }

    // Simulate loading
    setTimeout(() => {
      setMnemonic(state.mnemonic);
      setIsLoading(false);
    }, 1000);

    // Get tab element dimensions for the sliding indicator
    const solanaTab = document.getElementById("solana-tab");
    const ethereumTab = document.getElementById("ethereum-tab");

    if (solanaTab && ethereumTab) {
      const solanaRect = solanaTab.getBoundingClientRect();
      const ethereumRect = ethereumTab.getBoundingClientRect();

      setTabsRect({
        solana: {
          width: solanaRect.width,
          left: solanaRect.left,
        },
        ethereum: {
          width: ethereumRect.width,
          left: ethereumRect.left,
        },
      });
    }
  }, [location, navigate]);

  // Update the indicator position when tab changes
  useEffect(() => {
    if (indicatorRef.current) {
      const currentTab = activeTab === "solana" ? "solana" : "ethereum";
      const tabElement = document.getElementById(`${currentTab}-tab`);

      if (tabElement) {
        const rect = tabElement.getBoundingClientRect();
        const parentRect = tabElement.parentElement?.getBoundingClientRect();

        if (parentRect) {
          indicatorRef.current.style.width = `${rect.width}px`;
          indicatorRef.current.style.left = `${rect.left - parentRect.left}px`;
        }
      }
    }
  }, [activeTab, tabsRect]);

  const toggleSeedVisibility = () => {
    setShowSeed(!showSeed);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(mnemonic);
    setCopiedToClipboard(true);
    setTimeout(() => setCopiedToClipboard(false), 2000);
  };

  // Function to go back to seed generator
  const goToSeedGenerator = () => {
    navigate("/");
  };

  // Format mnemonic into words array
  const formatMnemonic = () => {
    if (!mnemonic) return [];
    return mnemonic.split(" ").map((word, index) => ({
      number: index + 1,
      word: word,
    }));
  };

  const wordList = formatMnemonic();

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen w-screen bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950">
        <div className="w-16 h-16 relative">
          <div className="absolute inset-0 rounded-full border-t-2 border-blue-500 animate-spin"></div>
          <div
            className="absolute inset-0 rounded-full border-l-2 border-indigo-500 animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          ></div>
        </div>
        <p className="mt-4 text-blue-300 font-medium animate-pulse">
          Loading your wallets...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 min-h-screen text-white font-sans relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 right-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-[120px] opacity-10 animate-blob"></div>
        <div className="absolute bottom-20 -left-20 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-[120px] opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 relative z-10">
        {/* Header with back button */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={goToSeedGenerator}
            className="flex items-center text-slate-400 hover:text-white transition-colors duration-200 group"
          >
            <ArrowLeft
              size={18}
              className="mr-2 transition-transform duration-200 group-hover:-translate-x-1"
            />
            <span>Back to Generator</span>
          </button>
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 animate-gradient-x">
            Wallet Manager
          </h1>
          <div className="w-32"></div> {/* Spacer for centering title */}
        </div>

        {/* Seed Phrase Section */}
        <div
          className={`bg-slate-800/30 backdrop-blur-md rounded-xl p-6 mb-8 border border-slate-700/50 shadow-xl transition-all duration-300 ${
            seedContainerHovered ? "border-blue-700/30 shadow-blue-900/30" : ""
          }`}
          onMouseEnter={() => setSeedContainerHovered(true)}
          onMouseLeave={() => setSeedContainerHovered(false)}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <ShieldCheck size={20} className="text-blue-400 mr-2" />
              <h2 className="text-xl font-bold text-blue-100">
                Your Seed Phrase
              </h2>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={toggleSeedVisibility}
                className={`flex items-center text-xs px-3 py-1.5 rounded-md transition-all duration-200 ${
                  showSeed
                    ? "bg-amber-800/50 text-amber-300 hover:bg-amber-700/50 border border-amber-700/30"
                    : "bg-blue-900/50 text-blue-300 hover:bg-blue-800/50 border border-blue-800/30"
                }`}
              >
                {showSeed ? (
                  <>
                    <EyeOff size={14} className="mr-1.5" />
                    Hide Phrase
                  </>
                ) : (
                  <>
                    <Eye size={14} className="mr-1.5" />
                    Show Phrase
                  </>
                )}
              </button>
              {showSeed && (
                <button
                  onClick={copyToClipboard}
                  className={`flex items-center text-xs px-3 py-1.5 rounded-md transition-all duration-200 ${
                    copiedToClipboard
                      ? "bg-green-800/50 text-green-300 border border-green-700/30"
                      : "bg-slate-700/70 hover:bg-slate-600/70 text-slate-300 hover:text-white border border-slate-600/50"
                  }`}
                >
                  {copiedToClipboard ? (
                    <>
                      <CheckCircle
                        size={14}
                        className="mr-1.5 animate-appear"
                      />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={14} className="mr-1.5" />
                      Copy
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          <div className="relative">
            {showSeed ? (
              <div className="bg-slate-900/90 border border-slate-700/70 rounded-lg p-4 shadow-inner animate-fade-in">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm">
                  {wordList.map((item, index) => (
                    <div
                      key={item.number}
                      className="flex items-center bg-slate-800/70 p-2 rounded border border-slate-700/70 animate-fade-in-up"
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      <span className="w-6 h-6 flex-shrink-0 rounded-full bg-blue-900/50 flex items-center justify-center text-xs text-blue-300 mr-2 font-semibold border border-blue-800/30">
                        {item.number}
                      </span>
                      <span className="font-mono text-blue-100 tracking-wide">
                        {item.word}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-slate-900/90 border border-slate-700/70 rounded-lg p-8 shadow-inner">
                <div className="flex flex-wrap justify-center">
                  {Array.from({ length: 24 }).map((_, index) => (
                    <div
                      key={index}
                      className="w-8 h-2 bg-slate-700 rounded-full mx-1 my-1.5 animate-pulse-staggered"
                      style={{ animationDelay: `${index * 100}ms` }}
                    ></div>
                  ))}
                </div>
                <div className="text-center text-slate-500 mt-3 font-medium">
                  ••• Hidden for security •••
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 flex items-start">
            <AlertTriangle
              size={16}
              className="text-amber-300 mr-2 flex-shrink-0 mt-0.5"
            />
            <p className="text-xs text-amber-200/90">
              Keep your seed phrase secure and private. Never share it with
              anyone or enter it on unverified websites.
            </p>
          </div>
        </div>

        {/* Wallet Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 border-b border-slate-700/50 relative">
            <button
              id="solana-tab"
              className={`py-3 px-6 font-medium text-sm transition-all duration-200 flex items-center ${
                activeTab === "solana"
                  ? "text-blue-300"
                  : "text-slate-400 hover:text-slate-300"
              }`}
              onClick={() => setActiveTab("solana")}
            >
              <div className="w-3 h-3 bg-gradient-to-tr from-purple-400 to-blue-500 rounded-full mr-2"></div>
              Solana Wallets
            </button>
            <button
              id="ethereum-tab"
              className={`py-3 px-6 font-medium text-sm transition-all duration-200 flex items-center ${
                activeTab === "ethereum"
                  ? "text-blue-300"
                  : "text-slate-400 hover:text-slate-300"
              }`}
              onClick={() => setActiveTab("ethereum")}
            >
              <div className="w-3 h-3 bg-gradient-to-tr from-blue-400 to-indigo-500 rounded-full mr-2"></div>
              Ethereum Wallets
            </button>
            {/* Active tab indicator - animated */}
            <div
              ref={indicatorRef}
              className="absolute bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300"
              style={{ width: "0px", left: "0px" }}
            ></div>
          </div>
        </div>

        {/* Wallet Content */}
        <div className="bg-slate-800/30 backdrop-blur-md rounded-xl p-6 border border-slate-700/50 shadow-xl min-h-[400px] relative overflow-hidden">
          <div
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              activeTab === "solana"
                ? "translate-x-0 opacity-100"
                : "translate-x-20 opacity-0 pointer-events-none"
            }`}
          >
            <div className="p-4">
              <Solana mnemonic={mnemonic} />
            </div>
          </div>

          <div
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              activeTab === "ethereum"
                ? "translate-x-0 opacity-100"
                : "-translate-x-20 opacity-0 pointer-events-none"
            }`}
          >
            <div className="p-4">
              <Eth mnemonic={mnemonic} />
            </div>
          </div>
        </div>

        {/* Generate New Seed Button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={goToSeedGenerator}
            className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-medium py-3.5 px-8 rounded-lg transition-all duration-300 transform hover:scale-[1.03] shadow-lg shadow-red-900/30 flex items-center group"
          >
            <RefreshCw
              size={18}
              className="mr-2 group-hover:rotate-180 transition-transform duration-500"
            />
            Generate New Seed Phrase
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-800/50 backdrop-blur-sm mt-20 relative z-10">
        <div className="max-w-5xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p className="font-light tracking-wide">
            © 2025 Secure Wallet. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Add global styles for animations */}
      <style>{`
        @keyframes blob {
          0% {
            transform: scale(1);
          }
          33% {
            transform: scale(1.1);
          }
          66% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }
        @keyframes gradient-x {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        @keyframes pulse-staggered {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }
        @keyframes appear {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
        .animate-pulse-staggered {
          animation: pulse-staggered 2s infinite;
        }
        .animate-appear {
          animation: appear 0.3s ease-out forwards;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default WalletManager;

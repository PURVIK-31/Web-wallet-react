import { generateMnemonic } from "bip39";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import {
  Copy,
  Shield,
  CheckCircle,
  AlertTriangle,
  ChevronRight,
  RefreshCw,
  Key,
  Lock,
  ExternalLink,
} from "lucide-react";
import Loader from "./components/Loader";
import WalletManager from "./pages/WalletManager";

function SeedGenerator() {
  const [mnemonic, setMnemonic] = useState("");
  const [loading, setLoading] = useState(false);
  const [seedLength, setSeedLength] = useState("24");
  const [confirmed, setConfirmed] = useState(false);
  const [seedSaved, setSeedSaved] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showWords, setShowWords] = useState(false);
  const navigate = useNavigate();

  // Show words with a staggered animation effect
  useEffect(() => {
    if (mnemonic && currentStep === 2) {
      setTimeout(() => {
        setShowWords(true);
      }, 300);
    } else {
      setShowWords(false);
    }
  }, [mnemonic, currentStep]);

  const generateSeedPhrase = () => {
    setLoading(true);
    setTimeout(() => {
      const strength = seedLength === "12" ? 128 : 256;
      const mn = generateMnemonic(strength);
      setMnemonic(mn);
      setLoading(false);
      setCurrentStep(2);
    }, 800);
  };

  const handleConfirmation = () => {
    setSeedSaved(true);
    setCurrentStep(3);
  };

  const proceedToWallets = () => {
    if (mnemonic && seedSaved) {
      navigate("/wallets", { state: { mnemonic } });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(mnemonic);
    setCopiedToClipboard(true);
    setTimeout(() => setCopiedToClipboard(false), 2000);
  };

  // Format mnemonic into a grid
  const formatMnemonic = () => {
    if (!mnemonic) return [];
    const words = mnemonic.split(" ");
    return words.map((word, index) => ({
      number: index + 1,
      word: word,
    }));
  };

  const wordList = formatMnemonic();

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 min-h-screen text-white font-sans relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-[120px] opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-[120px] opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-[120px] opacity-5 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header with subtle animation */}
      <header className="pt-8 pb-10 px-4 relative">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 text-center tracking-tight animate-gradient-x pb-1">
            Secure Wallet Setup
          </h1>
          <p className="text-center text-slate-400 mt-3 max-w-xl mx-auto text-lg font-light tracking-wide leading-relaxed">
            Generate and securely store your seed phrase to access your Solana
            and Ethereum wallets
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 pb-20 relative z-10">
        {/* Progress indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-md mx-auto">
            <div
              className={`flex flex-col items-center ${
                currentStep >= 1 ? "text-blue-400" : "text-slate-600"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                  currentStep >= 1
                    ? "border-blue-400 bg-blue-900/30 scale-110"
                    : "border-slate-600"
                }`}
              >
                <Key
                  size={16}
                  className={`transition-all duration-300 ${
                    currentStep >= 1 ? "text-blue-300" : "text-slate-500"
                  }`}
                />
              </div>
              <span
                className={`text-xs mt-2 font-medium transition-all duration-300 ${
                  currentStep >= 1 ? "text-blue-300" : "text-slate-500"
                }`}
              >
                Generate
              </span>
            </div>
            <div
              className={`h-1 flex-1 mx-1 transition-all duration-700 ${
                currentStep >= 2 ? "bg-blue-400" : "bg-slate-700"
              }`}
            ></div>
            <div
              className={`flex flex-col items-center ${
                currentStep >= 2 ? "text-blue-400" : "text-slate-600"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                  currentStep >= 2
                    ? "border-blue-400 bg-blue-900/30 scale-110"
                    : "border-slate-600"
                }`}
              >
                <Shield
                  size={16}
                  className={`transition-all duration-300 ${
                    currentStep >= 2 ? "text-blue-300" : "text-slate-500"
                  }`}
                />
              </div>
              <span
                className={`text-xs mt-2 font-medium transition-all duration-300 ${
                  currentStep >= 2 ? "text-blue-300" : "text-slate-500"
                }`}
              >
                Secure
              </span>
            </div>
            <div
              className={`h-1 flex-1 mx-1 transition-all duration-700 ${
                currentStep >= 3 ? "bg-blue-400" : "bg-slate-700"
              }`}
            ></div>
            <div
              className={`flex flex-col items-center ${
                currentStep >= 3 ? "text-blue-400" : "text-slate-600"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                  currentStep >= 3
                    ? "border-blue-400 bg-blue-900/30 scale-110"
                    : "border-slate-600"
                }`}
              >
                <Lock
                  size={16}
                  className={`transition-all duration-300 ${
                    currentStep >= 3 ? "text-blue-300" : "text-slate-500"
                  }`}
                />
              </div>
              <span
                className={`text-xs mt-2 font-medium transition-all duration-300 ${
                  currentStep >= 3 ? "text-blue-300" : "text-slate-500"
                }`}
              >
                Continue
              </span>
            </div>
          </div>
        </div>

        {/* Step 1: Generate seed phrase */}
        {currentStep === 1 && (
          <div className="bg-slate-800/30 backdrop-blur-md rounded-xl p-8 border border-slate-700/50 shadow-xl max-w-md mx-auto transition-all duration-500 animate-fade-in-up">
            <div className="text-center mb-8">
              <div className="inline-flex p-4 bg-blue-900/30 rounded-full mb-5 ring-2 ring-blue-600/20 animate-pulse-slow">
                <Key size={32} className="text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold mb-3 text-blue-50">
                Create Your Seed Phrase
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                A seed phrase is the master key to your crypto wallets.
                <span className="text-amber-300 font-medium ml-1">
                  Never share it with anyone.
                </span>
              </p>
            </div>

            <div className="mb-8">
              <label className="block mb-3 text-sm font-medium text-slate-300 tracking-wide">
                Choose seed phrase length:
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setSeedLength("12")}
                  className={`py-3 px-4 rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
                    seedLength === "12"
                      ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/20 border border-blue-500/20"
                      : "bg-slate-700/50 text-slate-300 hover:bg-slate-700/80 border border-slate-600/50"
                  }`}
                >
                  <span className="font-semibold text-base">12 words</span>
                  <span className="block text-xs mt-1 opacity-80 font-light">
                    Standard security
                  </span>
                </button>
                <button
                  onClick={() => setSeedLength("24")}
                  className={`py-3 px-4 rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
                    seedLength === "24"
                      ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/20 border border-blue-500/20"
                      : "bg-slate-700/50 text-slate-300 hover:bg-slate-700/80 border border-slate-600/50"
                  }`}
                >
                  <span className="font-semibold text-base">24 words</span>
                  <span className="block text-xs mt-1 opacity-80 font-light">
                    Enhanced security
                  </span>
                </button>
              </div>
            </div>

            <button
              onClick={generateSeedPhrase}
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium py-3.5 px-6 rounded-lg w-full transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl flex items-center justify-center shadow-lg shadow-blue-900/30 relative overflow-hidden group"
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-72 group-hover:h-72 opacity-10"></span>
              {loading ? (
                <>
                  <RefreshCw size={18} className="mr-2 animate-spin" />
                  <span className="animate-pulse">
                    Generating secure phrase...
                  </span>
                </>
              ) : (
                <>Generate {seedLength}-word Seed Phrase</>
              )}
            </button>
          </div>
        )}

        {/* Step 2: Display and secure seed phrase */}
        {currentStep === 2 && mnemonic && (
          <div className="space-y-8 transition-all duration-500 animate-fade-in-up">
            <div className="bg-slate-800/30 backdrop-blur-md rounded-xl p-8 border border-slate-700/50 shadow-xl">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">
                  Your Seed Phrase
                </h2>
                <button
                  onClick={copyToClipboard}
                  className={`flex items-center text-xs px-3 py-1.5 rounded-md transition-all duration-300 ${
                    copiedToClipboard
                      ? "bg-green-800/50 text-green-300 border border-green-600/30"
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
                      Copy to Clipboard
                    </>
                  )}
                </button>
              </div>

              <div className="bg-slate-900/90 border border-slate-700/70 rounded-lg p-4 mb-6 shadow-inner">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm">
                  {wordList.map((item, index) => (
                    <div
                      key={item.number}
                      className={`flex items-center bg-slate-800/70 p-2 rounded border border-slate-700/70 transition-all duration-300 ${
                        showWords
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }`}
                      style={{ transitionDelay: `${index * 30}ms` }}
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

              <div className="bg-amber-900/20 border border-amber-800/30 rounded-lg p-5 text-sm text-amber-200 flex items-start animate-pulse-glow">
                <AlertTriangle
                  size={20}
                  className="mr-3 flex-shrink-0 mt-0.5 text-amber-300"
                />
                <div>
                  <p className="font-semibold mb-2 tracking-wide text-amber-200">
                    Critical Security Warning
                  </p>
                  <ul className="list-disc list-inside space-y-1.5 text-amber-200/90 leading-relaxed">
                    <li>
                      Write this seed phrase down on paper and store it securely
                    </li>
                    <li>Never share your seed phrase with anyone</li>
                    <li>Anyone with this phrase can access all your wallets</li>
                    <li>This phrase cannot be recovered if lost</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/30 backdrop-blur-md rounded-xl p-8 border border-slate-700/50 shadow-xl text-center">
              <div className="space-y-6">
                <label className="flex items-center justify-center space-x-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={confirmed}
                      onChange={() => setConfirmed(!confirmed)}
                      className="form-checkbox h-5 w-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-200"
                    />
                    {confirmed && (
                      <span className="absolute inset-0 animate-ping bg-blue-400 rounded opacity-50"></span>
                    )}
                  </div>
                  <span className="text-slate-300 group-hover:text-white transition-colors duration-200">
                    I have saved my seed phrase securely
                  </span>
                </label>

                <button
                  onClick={handleConfirmation}
                  disabled={!confirmed}
                  className={`flex items-center justify-center mx-auto py-3.5 px-8 rounded-lg font-medium transition-all duration-300 ${
                    confirmed
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white shadow-lg shadow-green-900/30 transform hover:scale-[1.03]"
                      : "bg-slate-700/50 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  Confirm & Continue
                  <ChevronRight
                    size={18}
                    className={`ml-1 transition-transform duration-300 ${
                      confirmed ? "group-hover:translate-x-1" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Proceed to wallet */}
        {currentStep === 3 && seedSaved && (
          <div className="bg-slate-800/30 backdrop-blur-md rounded-xl p-10 border border-slate-700/50 shadow-xl max-w-md mx-auto text-center transition-all duration-500 animate-fade-in-up">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-green-900/30 mx-auto mb-6 ring-4 ring-green-500/20 animate-success-pulse">
              <CheckCircle size={40} className="text-green-400" />
            </div>
            <h2 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-300">
              Seed Phrase Secured!
            </h2>
            <p className="text-slate-300 mb-8 leading-relaxed">
              Your seed phrase has been generated successfully. You can now
              proceed to manage your wallets.
            </p>
            <button
              onClick={proceedToWallets}
              className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-medium py-3.5 px-8 rounded-lg transition-all duration-300 shadow-lg shadow-purple-900/30 group flex items-center justify-center mx-auto hover:scale-105"
            >
              Continue to Wallet Manager
              <ExternalLink
                size={16}
                className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-800/50 backdrop-blur-sm mt-auto relative z-10">
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
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(217, 119, 6, 0.1);
          }
          50% {
            box-shadow: 0 0 10px 2px rgba(217, 119, 6, 0.2);
          }
        }
        @keyframes success-pulse {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
          }
          50% {
            box-shadow: 0 0 20px 10px rgba(34, 197, 94, 0.2);
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
        .animate-pulse-slow {
          animation: pulse-slow 3s infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s infinite;
        }
        .animate-success-pulse {
          animation: success-pulse 2s infinite;
        }
        .animate-appear {
          animation: appear 0.3s ease-out forwards;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-slate-900">
        <Loader />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SeedGenerator />} />
        <Route path="/wallets" element={<WalletManager />} />
      </Routes>
    </Router>
  );
}

export default App;

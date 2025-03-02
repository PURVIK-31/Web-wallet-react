import { generateMnemonic } from "bip39";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Solana from "./components/Solana";
import { Eth } from "./components/Eth";
import Loader from "./components/Loader";
import WalletManager from "./pages/WalletManager";

function SeedGenerator() {
  const [mnemonic, setMnemonic] = useState("");
  const [loading, setLoading] = useState(false);
  const [seedLength, setSeedLength] = useState<"12" | "24">("24");
  const [confirmed, setConfirmed] = useState(false);
  const [seedSaved, setSeedSaved] = useState(false);
  const navigate = useNavigate();

  const generateSeedPhrase = () => {
    setLoading(true);
    // Small delay to show loading state
    setTimeout(() => {
      const strength = seedLength === "12" ? 128 : 256;
      const mn = generateMnemonic(strength);
      setMnemonic(mn);
      setLoading(false);
    }, 500);
  };

  const handleConfirmation = () => {
    setSeedSaved(true);
  };

  const proceedToWallets = () => {
    if (mnemonic && seedSaved) {
      navigate("/wallets", { state: { mnemonic } });
    }
  };

  return (
    <div className="bg-black text-white p-4 min-h-screen">
      <h1 className="bg-black text-8xl  text-white text-center">
        Create a Seed Phrase
      </h1>

      <p className="mt-6 text-center text-mono">
        Generate a mnemonic seed phrase for Solana and Ethereum wallets
      </p>

      <div className="flex flex-col items-center justify-center mt-6">
        <div className="mb-4">
          <label className="mr-4">Choose seed phrase length:</label>
          <select
            value={seedLength}
            onChange={(e) => setSeedLength(e.target.value as "12" | "24")}
            className="bg-gray-800 text-white px-3 py-2 rounded"
          >
            <option value="12">12 words (standard security)</option>
            <option value="24">24 words (enhanced security)</option>
          </select>
        </div>

        <button
          onClick={generateSeedPhrase}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={loading}
        >
          {loading
            ? "Generating..."
            : `Generate ${seedLength}-word Seed Phrase`}
        </button>
      </div>

      {mnemonic && (
        <div className="mt-6">
          <h2 className="text-xl text-center mb-2">Your Seed Phrase:</h2>
          <div className="bg-gray-800 p-4 rounded-md font-mono text-sm break-words border border-gray-600 mx-auto max-w-3xl">
            {mnemonic}
          </div>
          <p className="text-xs text-center mt-2 text-gray-400">
            Save this phrase somewhere safe. It gives full access to your
            wallet.
          </p>

          <div className="flex flex-col items-center mt-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={() => setConfirmed(!confirmed)}
                className="form-checkbox h-5 w-5 text-blue-500"
              />
              <span>I have safely stored my seed phrase</span>
            </label>

            {confirmed && !seedSaved && (
              <button
                onClick={handleConfirmation}
                className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Confirm I've Saved My Seed Phrase
              </button>
            )}

            {seedSaved && (
              <button
                onClick={proceedToWallets}
                className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded animate-pulse"
              >
                Proceed to My Wallets
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-black">
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

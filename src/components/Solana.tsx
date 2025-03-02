import { useState, useEffect } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import bs58 from "bs58";
import {
  Copy,
  Check,
  Shield,
  Plus,
  Eye,
  EyeOff,
  AlertCircle,
  Clipboard,
  ExternalLink,
} from "lucide-react";

type SolanaProps = {
  mnemonic: string;
};

const Solana = ({ mnemonic }: SolanaProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [keypairs, setKeypairs] = useState<Keypair[]>([]);
  const [viewingPrivateKey, setViewingPrivateKey] = useState<number | null>(
    null
  );
  const [copiedIndex, setCopiedIndex] = useState<{
    type: string;
    index: number;
  } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [walletLabels, setWalletLabels] = useState<string[]>([]);
  const [editingLabel, setEditingLabel] = useState<number | null>(null);
  const [labelInput, setLabelInput] = useState("");

  // Generate initial wallet on first render
  useEffect(() => {
    if (keypairs.length === 0) {
      generateWallet();
    }
  }, []);

  // Function to generate a new wallet
  const generateWallet = async () => {
    setIsGenerating(true);
    try {
      // Simulate a slight delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 600));

      const seed = await mnemonicToSeed(mnemonic);
      const path = `m/44'/501'/${currentIndex}'/0'`;
      const derivedSeed = derivePath(path, seed.toString("hex")).key;
      const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
      const keypair = Keypair.fromSecretKey(secret);

      setCurrentIndex(currentIndex + 1);
      setKeypairs([...keypairs, keypair]);
      setWalletLabels([...walletLabels, `Solana Wallet ${currentIndex + 1}`]);
    } catch (error) {
      console.error("Error generating wallet:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Function to copy text to clipboard
  const copyToClipboard = (text: string, type: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex({ type, index });
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Function to toggle private key visibility
  const togglePrivateKey = (index: number) => {
    setViewingPrivateKey(viewingPrivateKey === index ? null : index);
  };

  // Function to start editing a wallet label
  const startEditLabel = (index: number) => {
    setLabelInput(walletLabels[index]);
    setEditingLabel(index);
  };

  // Function to save the edited label
  const saveLabel = (index: number) => {
    const newLabels = [...walletLabels];
    newLabels[index] = labelInput || `Solana Wallet ${index + 1}`;
    setWalletLabels(newLabels);
    setEditingLabel(null);
  };

  // Truncate address for display
  const truncateAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 6
    )}`;
  };

  return (
    <div className="w-full">
      {/* Header with generation button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-blue-300 flex items-center">
          <div className="w-3 h-3 bg-gradient-to-tr from-purple-400 to-blue-500 rounded-full mr-2"></div>
          Solana Wallets ({keypairs.length})
        </h2>

        <button
          onClick={generateWallet}
          disabled={isGenerating}
          className="group flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm py-2 px-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-900/30 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <div className="flex items-center">
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
              Generating...
            </div>
          ) : (
            <>
              <Plus
                size={16}
                className="mr-2 group-hover:rotate-90 transition-transform duration-300"
              />
              Generate New Wallet
            </>
          )}
        </button>
      </div>

      {/* Wallets list */}
      {keypairs.length === 0 ? (
        <div className="text-center py-10 text-slate-400">
          <AlertCircle size={32} className="mx-auto mb-3 text-slate-500" />
          <p>
            No Solana wallets generated yet. Click the button above to create
            your first wallet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {keypairs.map((keypair, index) => (
            <div
              key={index}
              className="bg-slate-800/50 border border-slate-700/70 rounded-xl overflow-hidden transition-all duration-300 hover:border-blue-700/30 hover:shadow-md hover:shadow-blue-900/10 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-between items-center p-4 border-b border-slate-700/50">
                {editingLabel === index ? (
                  <div className="flex items-center flex-1">
                    <input
                      type="text"
                      value={labelInput}
                      onChange={(e) => setLabelInput(e.target.value)}
                      className="bg-slate-700/50 border border-slate-600 rounded px-2 py-1 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-full max-w-xs"
                      autoFocus
                      onBlur={() => saveLabel(index)}
                      onKeyDown={(e) => e.key === "Enter" && saveLabel(index)}
                    />
                    <button
                      onClick={() => saveLabel(index)}
                      className="ml-2 p-1 bg-blue-600/30 text-blue-300 rounded hover:bg-blue-600/50 transition-colors"
                    >
                      <Check size={14} />
                    </button>
                  </div>
                ) : (
                  <h3
                    className="text-sm font-medium text-blue-200 cursor-pointer hover:text-blue-100 transition-colors"
                    onClick={() => startEditLabel(index)}
                  >
                    {walletLabels[index]}
                  </h3>
                )}
                <div className="text-xs text-slate-500 font-mono">
                  Path: m/44'/501'/{index}'/0'
                </div>
              </div>

              <div className="p-4">
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-slate-400">
                      Public Address
                    </span>
                    <div className="flex space-x-1">
                      <button
                        onClick={() =>
                          copyToClipboard(
                            keypair.publicKey.toBase58(),
                            "address",
                            index
                          )
                        }
                        className="p-1 text-slate-400 hover:text-blue-300 transition-colors rounded-md hover:bg-blue-900/20"
                        title="Copy address"
                      >
                        {copiedIndex?.type === "address" &&
                        copiedIndex?.index === index ? (
                          <Check size={14} className="text-green-400" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>
                      <a
                        href={`https://explorer.solana.com/address/${keypair.publicKey.toBase58()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 text-slate-400 hover:text-blue-300 transition-colors rounded-md hover:bg-blue-900/20"
                        title="View on Solana explorer"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                  <div
                    className="bg-slate-900/70 py-2 px-3 rounded font-mono text-sm text-blue-100 truncate cursor-pointer group hover:bg-slate-900 transition-colors"
                    onClick={() =>
                      copyToClipboard(
                        keypair.publicKey.toBase58(),
                        "address",
                        index
                      )
                    }
                    title={keypair.publicKey.toBase58()}
                  >
                    <span className="hidden md:inline">
                      {keypair.publicKey.toBase58()}
                    </span>
                    <span className="md:hidden">
                      {truncateAddress(keypair.publicKey.toBase58())}
                    </span>
                    <span className="text-xs text-blue-500 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to copy
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-slate-400">Private Key</span>
                    <button
                      onClick={() => togglePrivateKey(index)}
                      className={`flex items-center text-xs px-2 py-0.5 rounded transition-colors duration-200 ${
                        viewingPrivateKey === index
                          ? "bg-amber-800/50 text-amber-300 hover:bg-amber-700/50"
                          : "bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-slate-300"
                      }`}
                    >
                      {viewingPrivateKey === index ? (
                        <>
                          <EyeOff size={12} className="mr-1" />
                          Hide
                        </>
                      ) : (
                        <>
                          <Eye size={12} className="mr-1" />
                          Show
                        </>
                      )}
                    </button>
                  </div>

                  {viewingPrivateKey === index ? (
                    <div className="relative">
                      <div className="bg-slate-900/70 py-2 px-3 rounded font-mono text-xs text-amber-300 break-all border border-amber-800/20">
                        {bs58.encode(keypair.secretKey)}
                      </div>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            bs58.encode(keypair.secretKey),
                            "privateKey",
                            index
                          )
                        }
                        className="absolute top-2 right-2 p-1 bg-slate-800/80 text-slate-400 hover:text-amber-300 rounded-md transition-colors hover:bg-slate-700/80"
                        title="Copy private key"
                      >
                        {copiedIndex?.type === "privateKey" &&
                        copiedIndex?.index === index ? (
                          <Check size={14} className="text-green-400" />
                        ) : (
                          <Clipboard size={14} />
                        )}
                      </button>
                    </div>
                  ) : (
                    <div className="bg-slate-900/70 py-2 px-3 rounded font-mono text-sm text-slate-600 flex items-center justify-center border border-slate-800/50">
                      <Shield size={14} className="mr-2 text-slate-500" />
                      <span>••••••••••••••••••• (hidden for security)</span>
                    </div>
                  )}

                  {viewingPrivateKey === index && (
                    <div className="mt-2 flex items-start">
                      <AlertCircle
                        size={14}
                        className="text-amber-300 mr-2 flex-shrink-0 mt-0.5"
                      />
                      <p className="text-xs text-amber-200/80">
                        Never share your private key with anyone. Anyone with
                        access to this key can control your funds.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Animated slide-in labels for new wallets */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Solana;

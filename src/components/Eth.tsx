import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";

interface Ethprops {
  mnemonic: string;
}

export const Eth = ({ mnemonic }: Ethprops) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [viewingPrivateKey, setViewingPrivateKey] = useState<number | null>(
    null
  );

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-6 bg-black font-mono text-blue-500">
        <button
          onClick={async function () {
            const seed = await mnemonicToSeed(mnemonic);
            const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
            const hdNode = HDNodeWallet.fromSeed(seed);
            const child = hdNode.derivePath(derivationPath);
            const privateKey = child.privateKey;
            const wallet = new Wallet(privateKey);
            setCurrentIndex(currentIndex + 1);
            setWallets([...wallets, wallet]);
          }}
        >
          Click for generating ETH wallet
        </button>
      </div>
      <div className="font-serif text-center text-white mt-7">
        Ethereum Wallet Addresses:
      </div>
      <div className="flex flex-col items-center justify-center mt-6 bg-black font-mono text-blue-500">
        {wallets.map((wallet, index) => (
          <div key={index} className="flex flex-col items-center mb-4">
            <div className="mb-2">{wallet.address}</div>
            <button
              className="px-3 py-1 bg-blue-700 text-white rounded hover:bg-blue-800 text-sm"
              onClick={() =>
                setViewingPrivateKey(viewingPrivateKey === index ? null : index)
              }
            >
              {viewingPrivateKey === index
                ? "Hide Private Key"
                : "See Private Key"}
            </button>
            {viewingPrivateKey === index && (
              <div className="mt-2 p-2 bg-gray-800 border border-gray-700 rounded text-yellow-400 text-xs">
                {wallet.privateKey}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

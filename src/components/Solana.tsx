// Code for Solana component

import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { useState } from "react";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import bs58 from "bs58"; // Direct import from bs58 package

type SolanaProps = {
  mnemonic: string;
};

const Solana = ({ mnemonic }: SolanaProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [keypairs, setKeypairs] = useState<Keypair[]>([]);
  const [viewingPrivateKey, setViewingPrivateKey] = useState<number | null>(
    null
  );

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-6 bg-black font-mono text-blue-500">
        <button
          onClick={async () => {
            const seed = await mnemonicToSeed(mnemonic);
            const path = `m/44'/501'/${currentIndex}'/0'`;
            const derivedSeed = derivePath(path, seed.toString("hex")).key;
            const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
            const keypair = Keypair.fromSecretKey(secret);
            setCurrentIndex(currentIndex + 1);
            setKeypairs([...keypairs, keypair]);
          }}
        >
          Click for generating a wallet!!
        </button>
      </div>
      <div className="font-serif text-center text-white mt-7">
        Public keys for Wallets :{" "}
      </div>
      <div className="flex flex-col items-center justify-center mt-6 bg-black font-mono text-blue-500">
        {keypairs.map((keypair, index) => (
          <div key={index} className="flex flex-col items-center mb-4">
            <div className="mb-2">{keypair.publicKey.toBase58()}</div>
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
                {bs58.encode(keypair.secretKey)}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Solana;

// Code for Solana component

import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { useState } from "react";
import { Keypair, PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";
type SolanaProps = {
  mnemonic: string;
};

const Solana = ({ mnemonic }: SolanaProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState<PublicKey[]>([]);
  return (
    <>
      <div>Solana Wallet here : </div>;
      <button
        onClick={async () => {
          const seed = await mnemonicToSeed(mnemonic);
          const path = `m/44'/501'/${currentIndex}'/0'`;
          const derivedSeed = derivePath(path, seed.toString("hex")).key;
          const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
          const keypair = Keypair.fromSecretKey(secret);
          setCurrentIndex(currentIndex + 1);
          setPublicKeys([...publicKeys, keypair.publicKey]);
        }}
      >
        Click for generting a wallet!!
      </button>
      <textarea value={mnemonic} readOnly />
      <textarea value={mnemonicToSeed(mnemonic).toString()} readOnly />
      {publicKeys.map((p) => (
        <div>{p.toBase58()}</div>
      ))}
    </>
  );
};

export default Solana;

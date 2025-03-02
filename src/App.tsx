import { generateMnemonic } from "bip39";
import { useState } from "react";
import Solana from "./components/Solana";
import Eth from "./components/Eth";
function App() {
  const [mnemonic, setMnemonic] = useState("");
  return (
    <>
      <h1>Create a Seed Phrase !!</h1>

      <p>
        Click the button below to generate a random 24-word mnemonic seed
        phrase.
      </p>
      <button
        onClick={() => {
          const mn = generateMnemonic(256);
          setMnemonic(mn);
        }}
      >
        Click for generating!
      </button>
      <p>Click below for a 12 words mnemonic seed phase!</p>
      <button
        onClick={() => {
          const mn = generateMnemonic(128);
          setMnemonic(mn);
        }}
      >
        Click here!
      </button>

      <h2>{mnemonic}</h2>

      <Solana mnemonic={mnemonic} />
      {/* <Eth mnemonic={mnemonic} /> */}
    </>
  );
}

export default App;

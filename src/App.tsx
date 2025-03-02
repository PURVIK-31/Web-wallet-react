import { generateMnemonic } from "bip39";
import { useState } from "react";

function App() {
  const [mnemonic, setMnemonic] = useState("");
  return (
    <>
      <h1>Create a Seed Phrase !!</h1>
      <button
        onClick={() => {
          const mn = generateMnemonic();
          setMnemonic(mn);
        }}
      >
        Click for generting!
      </button>
      <h2>{mnemonic}</h2>
    </>
  );
}

export default App;

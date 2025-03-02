# Web-Based Cryptocurrency Wallet

## Overview

This project is a simple web-based cryptocurrency wallet that allows users to generate wallet addresses for multiple blockchains (Ethereum and Solana) from a single seed phrase. Built with React and TypeScript, it demonstrates the principles of hierarchical deterministic (HD) wallets.

## Features

- Generate 12 or 24-word mnemonic seed phrases
- Derive multiple wallet addresses from a single seed.
- Support for Ethereum (ETH) addresses
- Support for Solana (SOL) addresses.
- Client-side only implementation (no server communication).

## Technical Implementation

### Key Dependencies

- React + TypeScript
- `bip39` - For mnemonic generation and seed derivation.
- `ethers` - For Ethereum wallet functionality.
- `@solana/web3.js` - For Solana wallet functionality.
- `ed25519-hd-key` - For Solana key derivation.

### Component Structure

- `App.tsx` - Main application component that handles mnemonic generation.
- `Eth.tsx` - Component for generating Ethereum addresses.
- `Solana.tsx` - Component for generating Solana addresses.

### Key Concepts

#### HD Wallet Derivation

- Uses BIP39 for mnemonic to seed conversion.
- Implements proper derivation paths for each blockchain.

#### Wallet Address Generation

- For Ethereum: `m/44'/60'/{index}'/0'` path.
- For Solana: `m/44'/501'/{index}'/0'` path.

#### State Management

- Uses React hooks for managing wallet addresses.
- Incremental index counter for generating sequential addresses.

## How It Works

### Mnemonic Generation

```typescript
const mn = generateMnemonic(256); // 24 words
// or
const mn = generateMnemonic(128); // 12 words
```

### Ethereum Address Derivation (TypeScript)

```typescript
import { HDNodeWallet, Wallet } from "ethers";
import { mnemonicToSeed } from "bip39";

async function deriveEthereumAddress(
  mnemonic: string,
  index: number
): Promise<string> {
  const seed = await mnemonicToSeed(mnemonic);
  const derivationPath = `m/44'/60'/${index}'/0'`;
  const hdNode = HDNodeWallet.fromSeed(seed);
  const child = hdNode.derivePath(derivationPath);
  const privateKey = child.privateKey;
  const wallet = new Wallet(privateKey);
  return wallet.address;
}

// Example usage:
// const address = await deriveEthereumAddress(yourMnemonic, 0);
// console.log(address);
```

### Solana Address Derivation (TypeScript)

```typescript
import { Keypair } from "@solana/web3.js";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";

async function deriveSolanaAddress(
  mnemonic: string,
  index: number
): Promise<string> {
  const seed = await mnemonicToSeed(mnemonic);
  const path = `m/44'/501'/${index}'/0'`;
  const derivedSeed = derivePath(path, seed.toString("hex")).key;
  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
  const keypair = Keypair.fromSecretKey(secret);
  return keypair.publicKey.toString();
}

// Example usage:
// const address = await deriveSolanaAddress(yourMnemonic, 0);
// console.log(address);
```

### Security Considerations

- This is a demonstration project and not intended for production use.
- Seed phrases should never be stored in plain text or transmitted over the network.
- For real-world use, consider hardware wallets or secure key management solutions.

### Future Improvements

- Add balance checking functionality.
- Implement transaction signing and sending.
- Add more blockchain networks.
- Improve UI with more detailed wallet information.
- Add proper key encryption for improved security.

### Educational Value

This project demonstrates:

- How cryptocurrency wallets work under the hood.
- The principles of hierarchical deterministic wallets.
- Cross-blockchain compatibility with a single seed phrase.
- React component design for crypto applications.
- TypeScript implementation for blockchain related code.

### Installation

#### Clone the repository:

```bash
git clone [repository URL]
cd [project directory]
```

#### Install dependencies:

```bash
npm install
```

#### Start the development server:

```bash
npm start
```

### Usage

- Open the application in your browser.
- Generate a new mnemonic phrase or input an existing one.
- Generate Ethereum or Solana addresses by clicking the respective buttons.
- View the generated addresses.

### Contributing

- Fork the repository.
- Create your feature branch (`git checkout -b feature/AmazingFeature`).
- Commit your changes (`git commit -am 'Add some AmazingFeature'`).
- Push to the branch (`git push origin feature/AmazingFeature`).
- Open a pull request.

### License

This project is licensed under the MIT License - see the LICENSE file for details.

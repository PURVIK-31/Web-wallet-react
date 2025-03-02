# Web-wallet-react

A secure, user-friendly web wallet application for managing digital assets.

## About this project

Web-wallet-react is a modern cryptocurrency wallet application that allows users to securely store, send, and receive digital assets through an intuitive web interface.

## Features

- Secure wallet creation and management
- Support for multiple cryptocurrencies
- Real-time balance and transaction updates
- QR code generation for easy deposits
- Transaction history and tracking
- Secure authentication system
- Responsive design for desktop and mobile devices

## Installation

```bash
# Clone the repository
git clone https://github.com/PURVIK-31/Web-wallet-react.git

# Navigate to the project directory
cd Web-wallet-react

# Install dependencies
npm install
# or with Bun
bun install

# Start the development server
npm run dev
# or with Bun
bun run dev
```

## Usage

### Creating a New Wallet

1. Navigate to the homepage
2. Click "Create Wallet"
3. Follow the security steps to generate your new wallet
4. Be sure to store your recovery phrase in a secure location

### Sending Funds

1. Go to the "Send" section of your wallet
2. Enter the recipient's address
3. Specify the amount to send
4. Review transaction details and confirm

### Receiving Funds

1. Navigate to the "Receive" section
2. Copy your wallet address or share the generated QR code
3. Monitor your transaction history for incoming funds

## Development

This project is built with React + TypeScript + Vite.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
],
languageOptions: {
    // other options...
    parserOptions: {
    project: ['./tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: import.meta.dirname,
    },
},
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
},
rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
},
})
```

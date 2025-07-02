# Solana CLI Wallet

A command-line wallet for Solana built using Bun, TypeScript, and the Solana Web3.js SDK. Manage keypairs, check balances, request airdrops, and transfer SOL — all from your terminal.


## Features

-  Generate and store keypairs securely
-  Request SOL airdrops on devnet
-  Check account balances
-  Transfer SOL between addresses
-  Clear stored wallet data


## Requirements

- [Bun](https://bun.sh/) v1.0+
- Node.js-compatible shell (e.g. Git Bash, PowerShell, or WSL on Windows)


## Installation

Clone the project:

```bash
git clone https://github.com/your-username/solana-cli-wallet.git
cd solana-cli-wallet
```

Install dependencies:
```bash
bun install
```

Build the CLI:
```bash
bun run start
```

Link the CLI globally:
```bash
bun link
```
This allows you to use solana-cli-wallet as a global command from anywhere in your terminal.

## Usage

### Run commands after linking:

Generate a new keypair
```bash
solana-cli-wallet keygen
```

List all stored keypairs
```bash
solana-cli-wallet list
```
Check SOL balance
```bash
solana-cli-wallet balance <publicKey>
```
Request airdrop (devnet only)
```bash
solana-cli-wallet airdrop <publicKey> <amount>
```
Transfer SOL
```bash
solana-cli-wallet transfer <senderPublicKey> <receiverPublicKey> <amount>
```
Clear all saved keypairs
```bash
solana-cli-wallet clear
```

## Reset CLI wallet

Clean build output
```bash
bun run clean
```
Reset everything (dependencies and build)
```bash
bun run reset
```

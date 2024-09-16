# Vault Data Signing Script

This script allows you to sign vault data using `ethers.js`. It uses a private key to sign data associated with a vault, producing a `keccak256` hash and a corresponding signature.

## Prerequisites

- Node.js (version 12.x or above)
- `ethers.js` (installed via npm)
- `dotenv` (installed via npm)

## Installation

1. **Clone the repository** or copy the script to your local machine.

2. **Install dependencies**:
   Ensure you have `ethers.js` and `dotenv` installed. Run the following command in your project directory:

   ```bash
   npm install ethers dotenv
   ```

3. **Create a `.env` file** in the root of your project. This file will hold your private keys for both mainnet and testnet. Add the following content:

   ```bash
   TESTNET_PRIVATE_KEY=your_testnet_private_key_here
   MAINNET_PRIVATE_KEY=your_mainnet_private_key_here
   ```

   Replace `your_testnet_private_key_here` and `your_mainnet_private_key_here` with your actual Ethereum private keys.

## Running the Script

1. **Update parameters**:
   Edit the script to set the correct `params` and `owner` values in the `test()` function for the vault data you wish to sign.

2. **Run the script**:
   Use the following command to execute the script:

   ```bash
   npm run start
   ```

   Make sure to replace `script.js` with the actual file name if it’s different.

## Script Explanation

- The script imports the necessary modules, reads environment variables, and uses `ethers.js` to generate a `keccak256` hash and sign a message using a private key.
- It selects either the mainnet or testnet private key based on the `chainId` provided in the parameters.

### Functions:

1. **`signVaultData(params, owner)`**:
   - Takes the vault data and owner address as input.
   - Signs the vault data and returns the signature and the original hash.

2. **`getVaultDataHash(params, owner)`**:
   - Returns a `keccak256` hash of the vault data using packed Solidity types.

### Parameters:

- `params`:
  - `name`: The name of the vault.
  - `appId`: The app ID associated with the vault.
  - `chainId`: The blockchain network ID (use 11155111 for testnet).
  - `vaultAddress`: The Ethereum address of the vault contract.
  
- `owner`: The Ethereum address of the vault owner.

---

## License

This project is licensed under the MIT License.

---
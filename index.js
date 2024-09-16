import { getBytes, Wallet, solidityPackedKeccak256 } from 'ethers';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

/**
 * Signs the vault data using the provided parameters and owner address.
 *
 * @param {Object} params - The parameters required to sign the vault data.
 * @param {string} params.name - The name of the vault.
 * @param {string} params.appId - The app ID associated with the vault.
 * @param {number} params.chainId - The chain ID (mainnet or testnet).
 * @param {string} params.vaultAddress - The vault's smart contract address.
 * @param {string} owner - The vault owner's address.
 * 
 * @returns {Promise<Object>} The signed message and the original hash.
 */
async function signVaultData(params, owner) {
    const { name, chainId } = params;
    const privateKey = chainId === 11155111 ? process.env.TESTNET_PRIVATE_KEY : process.env.MAINNET_PRIVATE_KEY;
    
    try {
        // Get the vault data hash
        const message = getVaultDataHash(params, owner);

        // Select the appropriate wallet based on chain ID
        const wallet = new Wallet(privateKey);

        // Sign the message
        const signature = await wallet.signMessage(getBytes(message));

        // Return the message for now (commented signature)
        return {signature, message};
    } catch (error) {
        console.log(error);
        throw new Error('Failed to sign vault data');
    }
}

/**
 * Returns the hash of vault data using the provided parameters.
 *
 * @param {Object} params - The parameters required to hash the vault data.
 * @param {string} params.name - The name of the vault.
 * @param {string} params.appId - The app ID associated with the vault.
 * @param {number} params.chainId - The chain ID (mainnet or testnet).
 * @param {string} params.vaultAddress - The vault's smart contract address.
 * @param {string} owner - The vault owner's address.
 * 
 * @returns {string} A keccak256 hash of the vault data.
 */
function getVaultDataHash(params, owner) {
    const { name, appId, chainId, vaultAddress } = params;

    // Create the keccak256 hash using solidityPackedKeccak256 equivalent in ethers.js
    return solidityPackedKeccak256(
        ['string', 'string', 'uint256', 'address', 'address'],
        [name, appId, chainId, vaultAddress, owner]
    );
}

async function test() {
    const params = {
        name: "Vault Name",
        vaultAddress: "0x10f3d572b830f9a5f7f65997da3c438c9a5b9f48",
        chainId: 11155111,
        appId: "c82425a7-8211-4aff-b418-967d085f1dae"
    };
    const owner = "0x734136Cb869f349aF65561Ab0B8B12396851E6e0";

    const result = await signVaultData(params, owner);
    console.log(result);
}

test();

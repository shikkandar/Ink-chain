import { http, createPublicClient, formatEther } from "viem";
import { mainnet } from "viem/chains";
import { Request, Response } from "express";

// Create the Viem public client for Ethereum mainnet
const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

// Function to get the balance of an address
export const getBalance = async (req: Request, res: Response) => {
  const { address, unit = "wei" } = req.query;

  try {
    // Check if address is provided and valid
    if (!address) {
      return res.status(400).json({ error: "Address is required." });
    }

    if (typeof address !== "string" || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
      return res
        .status(400)
        .json({ error: "Address must be a valid Ethereum address." });
    }

    const addressHex = address as `0x${string}`;

    // Get the balance from the public client
    const balance = await publicClient.getBalance({
      address: addressHex,
      blockTag: "latest",
    });

    // Format balance in either 'wei' or 'ether'
    const balanceResult =
      unit === "ether" ? formatEther(balance) : balance.toString();

    return res.json({ address, balance: balanceResult, unit });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};

// Function to verify a signed message
export const verifySignature = async (req: Request, res: Response) => {
  try {
    // Validate the request body is not empty
    if (!req.body) {
      return res.status(400).json({ error: "Request body is missing" });
    }

    const { address, signature, message } = req.body;

    // Validate that required fields are present
    if (!address || !message || !signature) {
      return res
        .status(400)
        .json({ error: "Address, message, and signature are required." });
    }

    // Proceed with the signature verification
    const isValid = await publicClient.verifyMessage({
      address,
      message,
      signature,
    });

    return res.json({ valid: isValid });
  } catch (error) {
    console.error("Error verifying signature:", error);
    return res.status(500).json({ error: "Error verifying the signature." });
  }
};

export const getTransactionByHash = async (req: Request, res: Response) => {
  const { hash } = req.query;

  try {
    if (!hash) {
      return res.status(400).json({ error: "Address is required." });
    }

    if (typeof hash !== "string" || !/^0x[a-fA-F0-9]{40}$/.test(hash)) {
      return res
        .status(400)
        .json({ error: "Address must be a valid Ethereum address." });
    }

    const transactionHex = hash as `0x${string}`;

    const transaction = await publicClient.getTransaction({
      hash: transactionHex,
    });

    return res.json({ transaction });
  } catch (error) {
    console.error("Error fetching transaction:", error);
    return res.status(500).json({ error: "Error fetching the transaction." });
  }
};



// Function to get transaction confirmations
export const getTransactionConfirmations = async (req: Request, res: Response) => {
  const { hash } = req.query;

  try {
    // Validate the transaction hash
    if (!hash || typeof hash !== 'string' || !/^0x[a-fA-F0-9]{64}$/.test(hash)) {
      return res.status(400).json({ error: 'A valid transaction hash is required.' });
    }

    // Fetch the number of confirmations for the transaction
    const confirmations = await publicClient.getTransactionConfirmations({ hash: hash as `0x${string}` });

    // Return the confirmations in the response
    return res.json({ hash, confirmations });
  } catch (error) {
    console.error('Error fetching transaction confirmations:', error);
    return res.status(500).json({ error: 'An error occurred while fetching transaction confirmations.' });
  }
};

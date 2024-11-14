// import express, { Request, Response } from "express";
// import { getBalance, getTransactionByHash, getTransactionConfirmations, verifySignature } from "./ink"; // Import the functions from ink.ts

// const app = express();
// const port = 3000;

// // Middleware to parse JSON bodies
// app.use(express.json());

// // Route for getting balance
// app.get("/getbalance", getBalance);

// // Route for verifying signature
// app.post("/verify-signature", verifySignature);

// app.get('/transaction', getTransactionByHash);

// app.get("/transaction-confirmations", getTransactionConfirmations);

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });

import { createPublicClient, http } from "viem";
import { inkSepolia } from "viem/chains";

const client = createPublicClient({
  chain: inkSepolia,
  transport: http(),
});

// Use async function to await the result

async function getChainId() {
  try {
    const transaction = await client.getChainId();
    console.log(transaction);
  } catch (error) {
    console.error("Error fetching block number:", error);
  }
}

async function getBalance() {
  try {
    const balance = await client.getBalance({
      address: "0xaf5D875BF478d0b5Facf95fE0BBa05Ef75877eFF",
    });
    const count = await client.getTransactionCount({
      address: "0xaf5D875BF478d0b5Facf95fE0BBa05Ef75877eFF",
    });
    console.log(balance, count);
  } catch (error) {
    console.error("Error fetching block number:", error);
  }
}

const getTransaction = async (hash: `0x${string}`) => {
  try {
    const transaction = await client.getTransaction({
      hash,
    });
    console.log(transaction);
  } catch (error) {
    console.error("Error fetching transaction:", error);
  }
};

getTransaction(
  "0x99610cbf06d10e78a65544106230ebce6821aa4b79da6e8b4836edaac2a72d5e"
);
getChainId();

getBalance();

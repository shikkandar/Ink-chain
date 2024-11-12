import express, { Request, Response, NextFunction } from "express";
import {
  getAddressAssetBalance,
  listAddressAssetBalances,
  listAddressMessages,
  listAddressTransactions,
  listContractAssetBalances,
  listLatestTransactions,
  submitTransaction,
  verifyFuelSignature,
} from "./fuelApi";

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Base route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.post("/get-balance", async (req: Request, res: Response) => {
  const { address, assetId } = req.body;

  if (!address || !assetId) {
    return res.status(400).json({ error: "Address and AssetId are required" });
  }

  try {
    const data = await getAddressAssetBalance(address, assetId);
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/list-balances", async (req: Request, res: Response) => {
  const { owner } = req.body;

  if (!owner) {
    return res.status(400).json({ error: "Owner is required" });
  }

  try {
    const data = await listAddressAssetBalances(owner);
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/list-messages", async (req: Request, res: Response) => {
  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ error: "Address is required" });
  }

  try {
    const data = await listAddressMessages(address);
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/list-transactions", async (req: Request, res: Response) => {
  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ error: "Address is required" });
  }

  try {
    const data = await listAddressTransactions(address);
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/list-contract-balances", async (req: Request, res: Response) => {
  const { contract } = req.body;

  if (!contract) {
    return res.status(400).json({ error: "Contract address is required" });
  }

  try {
    const data = await listContractAssetBalances(contract);
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/list-latest-transactions", async (req: Request, res: Response) => {
  try {
    const data = await listLatestTransactions();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/submit-transaction", async (req: Request, res: Response) => {
  const { encodedTransaction } = req.body;

  if (!encodedTransaction) {
    return res.status(400).json({ error: "Encoded transaction is required" });
  }

  try {
    const data = await submitTransaction(encodedTransaction);
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/verify-signature', async (req, res) => {
  const { header, payload, signature } = req.body;

  try {
    const isValid = await verifyFuelSignature({ header, payload, signature });
    
    if (isValid) {
      return res.status(200).json({ message: 'Signature verified successfully.' });
    } else {
      return res.status(400).json({ message: 'Invalid signature.' });
    }
  } catch (error) {
    console.error('Error verifying signature:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

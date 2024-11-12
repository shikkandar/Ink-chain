import express, { Request, Response, NextFunction } from "express";


const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Base route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

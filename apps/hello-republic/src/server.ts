import express from "express";
import { router } from "../generated/routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", router);

app.get("/", (_req, res) => {
  res.json({ message: "Hello Republic!", version: "0.1.0" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

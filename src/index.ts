import express from "express";
import cors from "cors";
import { router } from './routes/route';
import { config } from "dotenv";

config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use(express.static("public"));

app.use('/', router);

app.listen(3000, () => console.log("Server running in http://localhost:3000"))

export default app;
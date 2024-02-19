import express, { Express } from "express";
import cors from "cors";
import insurancesRouter from "./routes/insurancesRoutes.js";

const app: Express = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use("/insurances", insurancesRouter);

export default app;

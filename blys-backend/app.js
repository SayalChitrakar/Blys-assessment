import express from "express";
import dotenv from "dotenv";
import validationRouter from "./routes/validation.routes.js";
import cors from "cors";
const app = express();
dotenv.config();
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.get("/test", (request, response) => {
  response.send("working");
});
app.use("/validate", validationRouter);

export default app;

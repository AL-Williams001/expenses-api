import express from "express";
import cors from "cors";
import { db } from "./db/db.js";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// middlewares
app.use(express.json());
app.use(cors());

// routes
const routeFiles = fs.readdirSync("./routes");
routeFiles.forEach((routeFile) => {
  if (routeFile.endsWith(".js")) {
    const routePath = `./routes/${routeFile}`;
    import(routePath)
      .then((module) => {
        app.use("/api", module.default);
      })
      .catch((error) => {
        console.error(`Error loading route ${routePath}:`, error);
      });
  }
});

const server = () => {
  db();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

server();

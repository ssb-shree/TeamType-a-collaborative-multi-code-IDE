import dotenv from "dotenv";
dotenv.config();

import { server } from "./socket.js";
import { connectDB } from "./db/db.js";

const startServer = async () => {
  const db = await connectDB();
  if (db) {
    server.listen(8080, () =>
      console.log("server has started and DB is connected")
    );
  } else {
    console.log(`shutting down the server`);
    process.exit(1);
  }
};

startServer();

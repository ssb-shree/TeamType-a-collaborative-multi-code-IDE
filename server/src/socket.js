import { Server } from "socket.io";
import http from "http";

import app from "./app.js";

export const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin:
      process.env.STATUS !== "DEV" ? process.env.CLIENT_URL : "localhost:3000",
    credentials: true,
  },
});

io.on("connection", (socket) => console.log(`${socket.id} connected`));

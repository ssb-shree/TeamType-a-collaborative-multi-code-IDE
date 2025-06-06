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

const event = {
  startRoom: "start-project-room",
  enterRoom: "enter-project-room",
};

// temp DB to store user details
const userDetailsMap = {};

const getAllConnectedClients = (projectID) => {
  return Array.from(io.sockets.adapter.rooms.get(projectID) || []).map(
    (socketID) => {
      return { socketID, username: userSocketMap[socketID] };
    }
  );
};

io.on("connection", (socket) => {
  // user tries to create a room {owner}
  socket.on("start-project-room", (data) => {
    const { ownerId, userID, projectID, name } = data;

    // adding the owner to the temp DB
    userDetailsMap[socket.id] = { name, userID, ownerId };

    // below line will create a room
    socket.join(projectID);

    console.log("user map => ", userDetailsMap);
  });

  // user tries to join an existing roomm {guest}
  socket.on("enter-project-room", (data) => console.log(data));
});

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
  enterRoom: "enter-project-room",
  roomNotFound: "notFound-project-room",
  joinedRoom: "joined-project-room",
  leftRoomed: "user-left-room",
  codeUpdate: "project-code-updated",
  codeSync: "project-code-sync",
  endRoom: "project-session-ended",
  endRoom: "project-session-ended",
  sendMessage: "send-chat-message",
  receiveMessage: "receive-chat-message",
};

// temp DB to keep records of live users and rooms
const userDetailsMap = {};
const activeProjectRooms = new Set();

// functions to fetch the list of all users in userDetailsMap
const getAllConnectedClients = (projectID) => {
  return Array.from(io.sockets.adapter.rooms.get(projectID) || []).map(
    (socketID) => {
      return { socketID, userDetails: userDetailsMap[socketID] };
    }
  );
};

io.on("connection", (socket) => {
  socket.on(event.enterRoom, (data) => {
    try {
      // destructing the expected data from the user payload
      const { userID, projectID, role, name } = data;

      console.log("data obj => ", data);
      // throw error for empty fields
      if (!userID || !projectID || !role || !name) {
        throw new Error(
          `Empty Fields found in enter-project-room ${
            (userID, projectID, role)
          }`
        );
      }

      // add the user to live user records
      userDetailsMap[socket.id] = { userID, projectID, role, name };

      const handleJoinRoom = () => {
        socket.join(projectID);

        // make the entry in active rooms SET
        activeProjectRooms.add(projectID);

        // fetch the updated client list

        const clients = getAllConnectedClients(projectID);

        // emit an emmit with the updated data
        io.to(projectID).emit(event.joinedRoom, {
          updatedClients: clients,
          socketID: socket.id,
          name: name,
        });
      };

      const findRoom =
        io.sockets.adapter.rooms.has(projectID) ||
        activeProjectRooms.has(projectID);

      // handling the guest flow
      if (role === "guest") {
        if (!findRoom) {
          console.log(`Guest failed to join - Room ${projectID} not found`);
          return socket.emit("room-not-found", {
            message: "Room not available",
            success: false,
          });
        }
        handleJoinRoom();
        console.log(`Guest ${name} joined room ${projectID}`);
        return;
      }

      if (role == "owner") {
        console.log(`Owner ${name} creating room ${projectID}`);
        handleJoinRoom();
        return;
      }

      // DEBUG PURPOSES
      console.log("Room Status:", {
        projectID,
        socketRole: role,
        adapterRooms: Array.from(io.sockets.adapter.rooms.keys()),
        trackedRooms: Array.from(activeProjectRooms),
        currentSocketRooms: Array.from(socket.rooms),
      });
    } catch (error) {
      console.log("Error in enter-project-room ", error.message || error);
      socket.disconnect(); // forcing the user to disconnect
    }
  });

  socket.on(event.sendMessage, (data) => {
    try {
      const { name, message, projectID } = data;
      io.to(projectID).emit(event.receiveMessage, { name, message });
    } catch (error) {}
  });

  socket.on(event.codeUpdate, ({ code, projectID }) => {
    io.in(projectID).emit(event.codeUpdate, { code });
  });

  socket.on(event.codeSync, ({ code, socketID }) => {
    io.to(socketID).emit(event.codeUpdate, { code });
  });

  socket.on("disconnecting", () => {
    const user = userDetailsMap[socket.id];
    if (!user) return;

    const { role, projectID, name } = user;

    // For guests
    if (role === "guest") {
      console.log(`Guest ${name} disconnected`);
      // Remove user from the map
      delete userDetailsMap[socket.id];

      // Get remaining clients in the room
      const clients = getAllConnectedClients(projectID);

      // Notify all users in the room
      io.to(projectID).emit(event.leftRoomed, {
        socketID: socket.id,
        updatedClients: clients,
      });

      return;
    }

    // For owner
    if (role === "owner") {
      console.log(`Owner ${name} disconnected, ending session.`);

      // Notify all guests the session has ended
      io.to(projectID).emit(event.endRoom, {
        message: "Owner left. Session ended.",
      });

      // Clean all users from this projectID
      Object.keys(userDetailsMap).forEach((socketID) => {
        if (userDetailsMap[socketID].projectID === projectID) {
          delete userDetailsMap[socketID];
        }
      });

      // Delete project from active rooms
      activeProjectRooms.delete(projectID);
    }
  });
});

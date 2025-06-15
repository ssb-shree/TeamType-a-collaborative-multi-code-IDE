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
  pingInterval: 25000, // Send ping every 25 seconds
  pingTimeout: 5000, // Wait 5 seconds for pong before considering dead
  connectionStateRecovery: {
    maxDisconnectionDuration: 120000, // 2 minutes
    skipMiddlewares: true,
  },
});

const event = {
  enterRoom: "enter-project-room",
  roomNotFound: "notFound-project-room",
  projectID: "projectID-project-room",
  joinedRoom: "user-joined-room",
  leftRoomed: "user-left-room",
  codeUpdate: "project-code-updated",
  codeSync: "project-code-sync",
  initGuestEditor: "initialise-guest-editor",
  setInputOutputstate: "set-initial-input-output",
  initGuestInputOutput: "initialise-guest-input-output",
  inputUpdate: "project-input-update",
  outputUpdate: "project-output-update",
  endRoom: "project-session-ended",
  endRoom: "project-session-ended",
  sendMessage: "send-chat-message",
  receiveMessage: "receive-chat-message",
};

// temp DB to keep records of live users and rooms
const userDetailsMap = {};
const activeProjectRooms = new Set();
const recentCodeState = {};

// functions to fetch the list of all users in userDetailsMap
const getAllConnectedClients = (projectID) => {
  return Array.from(io.sockets.adapter.rooms.get(projectID) || []).map(
    (socketID) => {
      return { socketID, userDetails: userDetailsMap[socketID] };
    }
  );
};

io.on("connection", (socket) => {
  socket.on(event.enterRoom, ({ projectID, name, projectData, role }) => {
    if (role === "owner") {
      const { code, lang } = projectData;
      // save the initial state on the server
      recentCodeState[projectID] = { code, lang };

      // saving the user details on server
      userDetailsMap[socket.id] = { name, role, projectID };

      // letting the owner create the room
      socket.join(projectID);
      activeProjectRooms.add(projectID);

      // get the client list
      const clients = getAllConnectedClients(projectID);
      clients.forEach(({ socketID }) => {
        io.to(socketID).emit(event.joinedRoom, {
          updatedClientsList: clients,
          newUser: name,
          socketID: socket.id,
          newJoinersRole: role,
        });
      });
    }

    if (role == "guest") {
      const findRoom =
        io.sockets.adapter.rooms.has(projectID) ||
        activeProjectRooms.has(projectID);

      if (!findRoom) {
        return socket.emit(event.roomNotFound, {
          message: "room does not exist",
        });
      }

      // saving the user details on server
      userDetailsMap[socket.id] = { name, role, projectID };

      // letting the guest join the room
      socket.join(projectID);

      // get the client list
      const clients = getAllConnectedClients(projectID);

      // notify the connected users that someone has projectID
      clients.forEach(({ socketID }) => {
        io.to(socketID).emit(event.joinedRoom, {
          updatedClientsList: clients,
          newUser: name,
          socketID: socket.id,
          newJoinersRole: role,
        });
      });

      // initialize the code editor of the guest with the recentCodeState
      io.to(socket.id).emit(event.initGuestEditor, {
        syncGuestCode: recentCodeState[projectID],
      });

      // initialize the input output blocks of the guest with recentCodeState
      io.to(socket.id).emit(event.initGuestInputOutput, {
        syncGuestCode: recentCodeState[projectID],
      });
    }
  });

  socket.on(event.codeUpdate, ({ updatedCode, projectID }) => {
    // update the global cpode state of project first
    recentCodeState[projectID].code = updatedCode;

    // emit the update to clients in the room
    socket.in(projectID).emit(event.codeUpdate, {
      updatedCode: recentCodeState[projectID].code,
    });
  });

  socket.on(event.setInputOutputstate, ({ inputs, outputs, projectID }) => {
    recentCodeState[projectID] = {
      ...recentCodeState[projectID],
      inputs,
      outputs,
    };
  });

  socket.on(event.inputUpdate, ({ updateInput, projectID }) => {
    // update the global state of project first
    recentCodeState[projectID] = {
      ...recentCodeState[projectID],
      inputs: updateInput,
    };
    socket.in(projectID).emit(event.inputUpdate, {
      updateInput: recentCodeState[projectID].inputs,
    });
  });
});

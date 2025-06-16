import { Server } from "socket.io";
import http from "http";

import app from "./app.js";
import { runCode } from "./piston.js";

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
  leftRoom: "user-left-room",
  codeUpdate: "project-code-updated",
  codeSync: "project-code-sync",
  initGuestEditor: "initialise-guest-editor",
  setInputOutputstate: "set-initial-input-output",
  initGuestInputOutput: "initialise-guest-input-output",
  inputUpdate: "project-input-update",
  outputUpdate: "project-output-update",
  runCode: "project-run-code",
  codeOutput: "project-code-output",
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
      // fucntion only works with this logs on prod so dont tounch it
      console.log("== ENTERED owner block ==");
      console.log("Socket ID:", socket.id);
      console.log("Raw payload:", { name, role, projectID, projectData });

      if (!projectData) {
        console.error(
          "[ERROR] projectData is undefined for socket:",
          socket.id
        );
        return;
      }

      const { code, lang } = projectData;

      console.log("[DEBUG] projectData.code:", code);
      console.log("[DEBUG] projectData.lang:", lang);

      if (!code || !lang) {
        console.warn("[WARNING] Missing code or lang in projectData");
      }

      // Save the initial state on the server
      recentCodeState[projectID] = { code, lang };
      console.log("[DEBUG] Saved initial code state for projectID:", projectID);

      // Save user details on the server
      userDetailsMap[socket.id] = { name, role, projectID };
      console.log("[DEBUG] Saved user details for socket:", socket.id);

      // Letting the owner create the room
      socket.join(projectID);
      console.log("[DEBUG] Owner joined room:", projectID);

      activeProjectRooms.add(projectID);
      console.log("[DEBUG] Room added to activeProjectRooms");

      // Get the client list
      const clients = getAllConnectedClients(projectID);
      console.log(
        "[DEBUG] Clients connected to room:",
        clients.map((c) => c.socketID)
      );

      clients.forEach(({ socketID }) => {
        console.log(`[DEBUG] Emitting joinedRoom event to ${socketID}`);
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

  socket.on(event.sendMessage, ({ name, projectID, message }) => {
    // check if the message is empty
    if (message.trim() == "") return;
    io.to(projectID).emit(event.receiveMessage, { name, message });
  });

  socket.on(event.runCode, async ({ source, language, stdin, projectID }) => {
    const result = await runCode(source, language, stdin);

    io.to(projectID).emit(event.codeOutput, {
      output: result.run.output,
      stderr: result.run.stderr,
      stdout: result.run.stdout,
    });
  });

  socket.on("disconnecting", () => {
    const user = userDetailsMap[socket.id];
    let { name, role, projectID } = user;

    if (role == "owner") {
      // let everyone know session is about to end
      io.to(projectID).emit(event.endRoom, {
        message: "Session ended by owner.",
      });

      // remove the temp states saved on server
      activeProjectRooms.delete(projectID);
      delete recentCodeState[projectID];
      delete userDetailsMap[socket.id];
    } else {
      io.in(projectID).emit(event.leftRoom, { name });
      delete userDetailsMap[socket.id];
    }
  });
});

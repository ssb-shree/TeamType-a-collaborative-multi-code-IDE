import io from "socket.io-client";

const URL =
  process.env.NEXT_PUBLIC_STATUS === "PROD"
    ? process.env.NEXT_PUBLIC_BACKENDURL
    : "http://localhost:8080";

export const initSocket = async () => {
  const options = {
    "force new connection": true,
    reconnectAttempt: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
  };

  return io(URL, options);
};

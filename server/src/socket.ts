import { Server } from "socket.io";

let io: Server;

//
// INIT SOCKET
//
export const initSocket = (
  server: any
) => {
  io = new Server(server, {
    cors: {
      origin:
        "http://localhost:5173",

      methods: [
        "GET",
        "POST",
      ],
    },
  });

  //
  // CONNECTION
  //
  io.on(
    "connection",
    (socket) => {
      console.log(
        "User connected:",
        socket.id
      );

      //
      // DISCONNECT
      //
      socket.on(
        "disconnect",
        () => {
          console.log(
            "User disconnected:",
            socket.id
          );
        }
      );
    }
  );

  return io;
};

//
// GET SOCKET INSTANCE
//
export const getIO = () => {
  if (!io) {
    throw new Error(
      "Socket not initialized"
    );
  }

  return io;
};
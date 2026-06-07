import http from "http";

import app from "./app";

import { initSocket } from "./socket";

const PORT =
  process.env.PORT || 5000;

//
// CREATE HTTP SERVER
//
const server =
  http.createServer(app);

//
// INIT SOCKET
//
initSocket(server);

//
// START SERVER
//
server.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});
import { Server } from "socket.io";
import { createServer } from "http";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const httpServer = createServer(handle);
const io = new Server(httpServer);

let highestScore = 0; // Initialize highest score

io.on("connection", (socket) => {
  console.log("A user connected");

  // Send the current highest score to the newly connected client
  socket.emit("highestScore", highestScore);

  // Listen for score updates from clients
  socket.on("newScore", (score) => {
    if (score > highestScore) {
      highestScore = score;
      // Save the new highest score to persistent storage if needed
      // Example: await updateHighestScoreInDatabase(score);
      // Broadcast the new highest score to all clients
      io.emit("highestScore", highestScore);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

export default httpServer;

import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import {createServer} from "http";
import {Server} from "socket.io";

import indexRouter from "./routes/index.js";
import registerScoringEvents from "./events/score.js";
import registerMatchEvents from "./events/match.js";
import os from "os";
import chalk from "chalk";

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        credentials: true
    },
    transports: ["polling", "websocket"], // Transport protocols (websocket and long polling)
    pingInterval: 15000,
    pingTimeout: 20000,
    upgradeTimeout: 10000,              // Timeout for upgrading to WebSocket protocol
});

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// Routes
app.use("/", indexRouter);

io.on("connection", (socket) => {
    console.log(chalk.green("A user connected"));

    socket.onAny((event, ...args) => {
    console.log(`got event ${event}`);
  });

    registerScoringEvents(socket);
    registerMatchEvents(socket);

    socket.on("disconnect", () => {
        console.log(chalk.red("A user disconnected"));
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(chalk.green(`Server is running on http://localhost:${PORT}`));
});

const interfaces = os.networkInterfaces();
const ips = [];

for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
        if (iface.family === "IPv4" && !iface.internal) {
            ips.push(iface.address);
        }
    }
}

console.log("Local IP addresses:", ips);

export {server, io};
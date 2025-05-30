import chalk from "chalk";

export default function registerMatchEvents(socket) {
    socket.on("match:start", () => {
        console.log(chalk.green("Match started!"));
        socket.emit("match:start");
        socket.broadcast.emit("match:start");
    });

    socket.on("match:end", () => {
        console.log(chalk.red("Match ended!"));
        socket.emit("match:end");
        socket.broadcast.emit("match:end");
    });

    socket.on("match:reset", () => {
        console.log(chalk.cyan("Match reset!"));
        socket.emit("match:reset");
        socket.broadcast.emit("match:reset");
    });
}

import chalk from "chalk";

export default function registerScoreEvents(socket) {
    socket.on("score:add", (data) => {
        console.log(`Score added: ${data.alliance === "blue" ? chalk.blue(data.alliance) : chalk.red(data.alliance)} +${data.points} points`);
        socket.emit("score:ack", `Score updated: ${data.alliance} +${data.points} points`);
        socket.broadcast.emit("score:ack", `Score updated: ${data.alliance} +${data.points} points`);
    });

    socket.on("score:remove", (data) => {
        console.log(`Score removed: ${data.alliance === "blue" ? chalk.blue(data.alliance) : chalk.red(data.alliance)} -${data.points} points`);
        socket.emit("score:ack", `Score updated: ${data.alliance} +${data.points} points`);
        socket.broadcast.emit("score:ack", `Score updated: ${data.alliance} -${data.points} points`);
    });
}

import chalk from "chalk";

export default function registerScoreEvents(socket) {
    const score_events = [
        "score.coral:add",
        "score.coral:remove",
        "score.coral.through:add",
        "score.coral.through:remove",
        "score.algae.net:add",
        "score.algae.net:remove",
        "score.algae.processor:add",
        "score.algae.processor:remove",
        "score.auto.leave:set",
        "score.penalty:set",
        "score.foul:add",
        "score.foul:remove",
    ]

    score_events.forEach((eventName) => {
        socket.on(eventName, (data) => {
            console.log(`Score updated for alliance ${data.alliance === "blue" ? chalk.blue(data.alliance) : chalk.red(data.alliance)} ${data.toString()}`);
            socket.broadcast.emit(eventName, data);
            socket.emit("score:ack", "ACK score update sent");
        })
    });
}

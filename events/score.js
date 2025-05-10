export default function registerScoreEvents(socket) {
    socket.on("score:add", (data) => {
        console.log(`Score added: ${data.alliance} +${data.points} points`);
        socket.emit("score:ack", `Score updated: ${data.alliance} +${data.points} points`);
    });

    socket.on("score:penalty", (data) => {
        console.log(`Penalty added: ${data.alliance} -${data.points} points`);
        socket.emit("score:ack", `Penalty applied: ${data.alliance} -${data.points} points`);
    });
}

export default function registerScoreEvents(socket) {
    socket.on("score:add", (data) => {
        console.log(`Score added: ${data.alliance} +${data.points} points`);
        socket.emit("score:ack", `Score updated: ${data.alliance} +${data.points} points`);
    });

    socket.on("score:remove", (data) => {
        console.log(`Score removed: ${data.alliance} -${data.points} points`);
        socket.emit("score:ack", `Score updated: ${data.alliance} -${data.points} points`);
    });
}

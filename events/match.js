export default function registerMatchEvents(socket) {
    socket.on("match:start", () => {
        console.log("Match started!");
        socket.emit("match:start");
    });

    socket.on("match:end", () => {
        console.log("Match ended!");
        socket.emit("match:end");
    });

    socket.on("match:reset", () => {
        console.log("Match reset!");
        socket.emit("match:reset");
    });
}

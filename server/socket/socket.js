export const initializeSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join-party", (partyCode) => {
      socket.join(partyCode);

      console.log(
        `${socket.id} joined watch party ${partyCode}`
      );
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
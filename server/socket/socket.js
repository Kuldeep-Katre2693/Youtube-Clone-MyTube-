export const initializeSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join-party", (partyCode) => {
      socket.join(partyCode);

      console.log(
        `${socket.id} joined watch party ${partyCode}`
      );
    });

    socket.on("play-video", ({ partyCode, currentTime }) => {
  socket.to(partyCode).emit("play-video", {
    currentTime,
  });

  socket.on("pause-video", ({ partyCode, currentTime }) => {
  socket.to(partyCode).emit("pause-video", {
    currentTime,
  });

  console.log(
    `Pause event sent to room ${partyCode} at ${currentTime}s`
  );
});

  console.log(
    `Play event sent to room ${partyCode} at ${currentTime}s`
  );
});

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
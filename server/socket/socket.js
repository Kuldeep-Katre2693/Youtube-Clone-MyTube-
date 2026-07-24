const activeRooms = {};

export const initializeSocket = (io) => {
  io.on("connection", (socket) => {

    socket.on("join-party", ({ partyCode, user }) => {

      socket.join(partyCode);

      console.log("JOIN REQUEST");
console.log("Party:", partyCode);
console.log("User:", user);
console.log("Socket:", socket.id);

      if (!activeRooms[partyCode]) {
        activeRooms[partyCode] = [];
      }

      const exists = activeRooms[partyCode].find(
        (u) => u.socketId === socket.id
      );

      if (!exists) {
        activeRooms[partyCode].push({
          socketId: socket.id,
          userId: user._id,
          name: user.name,
          image: user.image,
        });
      }

      io.to(partyCode).emit(
        "participants-update",
        activeRooms[partyCode]
     
      );
      console.log("Current participants:", activeRooms[partyCode]);
    });

    socket.on("send-message", ({ partyCode, message }) => {
      io.to(partyCode).emit("receive-message", message);

      console.log(
        `Message in ${partyCode}: ${message.sender} -> ${message.text}`
      );
    });

    socket.on("play-video", ({ partyCode, currentTime }) => {
      socket.to(partyCode).emit("play-video", {
        currentTime,
      });

      console.log(
        `Play event sent to room ${partyCode} at ${currentTime}s`
      );
    });

    socket.on("pause-video", ({ partyCode, currentTime }) => {
      socket.to(partyCode).emit("pause-video", {
        currentTime,
      });

      console.log(
        `Pause event sent to room ${partyCode} at ${currentTime}s`
      );
    });

    socket.on("seek-video", ({ partyCode, currentTime }) => {
      socket.to(partyCode).emit("seek-video", {
        currentTime,
      });

      console.log(
        `Seek event sent to room ${partyCode} at ${currentTime}s`
      );
    });

    socket.on("disconnect", () => {
      for (const partyCode in activeRooms) {
        activeRooms[partyCode] =
          activeRooms[partyCode].filter(
            (user) => user.socketId !== socket.id
          );

        io.to(partyCode).emit(
          "participants-update",
          activeRooms[partyCode]
        );
      }

      console.log("User disconnected");
    });
  });
};


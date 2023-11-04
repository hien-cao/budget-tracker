require("dotenv").config();
const app = require("./src/app");
const {
  app: { port },
} = require("./src/configs/config");

const server = app.listen(port, () => {
  console.log(`Budget tracker service server start at ${port}`);
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Exit server Express");
  });
});

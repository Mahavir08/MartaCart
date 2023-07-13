const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

process.on("uncaughtException", (err) => {
  console.log(`ERROR : ${err.message}`);
  console.log("Shutting down server dut to uncaught exception");
  process.exit(1);
});

dotenv.config({ path: ".env" });

connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server Connected To Port ${process.env.PORT} in ${process.env.NODE_ENV} Mode`
  );
});

process.on("unhandledRejection", (error) => {
  console.log(`ERROR : ${error.message} `);
  console.log("Shutting down a server due to UNHANDLEPROMISEREJECTION");
  server.close(() => {
    process.exit(1);
  });
});

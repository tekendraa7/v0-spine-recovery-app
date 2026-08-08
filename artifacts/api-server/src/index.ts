import app from "./app";
import { logger } from "./lib/logger";

const requestedPort = Number(process.env["PORT"]);
const port = Number.isFinite(requestedPort) && requestedPort > 0
  ? requestedPort
  : 3000;

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
});

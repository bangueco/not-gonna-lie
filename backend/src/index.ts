import app from "./app";
import config from "./config";
import logger from "./utils/logger";

app.listen(config.PORT, () => {
  logger.info(`Server is now running at PORT:${config.PORT}`)
})
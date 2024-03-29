import dotenv from "dotenv";
dotenv.config();

import Fastify, { FastifyInstance } from "fastify";
import config from "config";

const port = config.get("port") as number;
const nodeEnv = config.get("nodeEnv") as string;

const FastifyServer = async () => {
  const server = Fastify(serverConfig);
  try {
    useRoutes(server);
    await server.listen(port, "0.0.0.0");
    process.stdout.write("\x1B[2J\x1B[0f\n");
    server.log.info(`🚀 Server listening on ${port}!`);
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

const useRoutes = (server: FastifyInstance) => {
  server.get("/healthcheck", async () => {
    return { status: "OK" };
  });
};

const serverConfig = {
  logger: {
    prettyPrint:
      nodeEnv === "development"
        ? {
            translateTime: "HH:MM:ss Z",
            ignore: "pid,reqId,hostname",
          }
        : false,
  },
};

FastifyServer();

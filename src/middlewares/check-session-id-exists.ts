import { FastifyRequest, FastifyReply } from "fastify";

export const checkSessionIdExists = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const sessionId = request.cookies.sessionId;

  if (!sessionId) {
    return reply.status(401).send({
      error: "Unauthorized",
    });
  }
};

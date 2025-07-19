import { FastifyInstance } from "fastify";

import { randomUUID } from "crypto";

import { knex } from "../database";

import { createTaskBodySchema, getTaskParamsSchema } from "../types";

import { checkSessionIdExists } from "../middlewares/check-session-id-exists";

export const tasksRoutes = async (app: FastifyInstance) => {
  app.post("/", async (request, reply) => {
    const bodyData = createTaskBodySchema.parse(request.body);

    const { status, task, type } = bodyData;

    let sessionId = request.cookies.sessionId;

    if (!sessionId) {
      sessionId = randomUUID();

      reply.cookie("sessionId", sessionId, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
    }

    await knex("tasks").insert({
      id: randomUUID(),
      session_id: sessionId,
      task,
      type,
      status,
    });

    return reply.status(201).send();
  });

  app.get(
    "/",
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const { sessionId } = request.cookies;

      const tasks = await knex("tasks").where("session_id", sessionId).select();

      reply.status(200).send({ tasks });
    }
  );

  app.get(
    "/:id",
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const { id } = getTaskParamsSchema.parse(request.params);

      const { sessionId } = request.cookies;

      const task = await knex("tasks")
        .where({ session_id: sessionId, id })
        .first();

      reply.status(200).send({ task });
    }
  );
};

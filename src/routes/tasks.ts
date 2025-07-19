import { FastifyInstance } from "fastify";

import { randomUUID } from "crypto";

import { knex } from "../database";

import {
  createTaskBodySchema,
  getTaskParamsSchema,
  updateTaskBodySchema,
} from "../types";

import { checkSessionIdExists } from "../middlewares/check-session-id-exists";

export const tasksRoutes = async (app: FastifyInstance) => {
  app.post("/", async (request, reply) => {
    const bodyData = createTaskBodySchema.parse(request.body);

    const { status, task, type, description, priority } = bodyData;

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
      description,
      type,
      status,
      priority,
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

  app.patch(
    "/:id",
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const { id } = getTaskParamsSchema.parse(request.params);

      const { sessionId } = request.cookies;

      const updates = updateTaskBodySchema.parse(request.body);

      if (Object.keys(updates).length === 0) {
        return reply.status(404).send({ message: "No data was sent" });
      }

      const updateTask = await knex("tasks")
        .where({ session_id: sessionId, id })
        .update({
          ...updates,
          updated_at: knex.fn.now(),
        })
        .returning("*");

      reply.status(200).send({ updateTask });
    }
  );

  app.delete(
    "/:id",
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const { id } = getTaskParamsSchema.parse(request.params);

      const { sessionId } = request.cookies;

      await knex("tasks").where({ session_id: sessionId, id }).delete();

      reply.status(200).send({
        message: "Task deleted successfully",
      });
    }
  );
};

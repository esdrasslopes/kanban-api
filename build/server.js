"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/app.ts
var import_fastify = __toESM(require("fastify"));
var import_cookie = __toESM(require("@fastify/cookie"));

// src/routes/tasks.ts
var import_crypto = require("crypto");

// src/database.ts
var import_knex = require("knex");

// src/env/index.ts
var import_dotenv = require("dotenv");

// src/types/index.ts
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  DATABASE_URL: import_zod.z.string(),
  DATABASE_CLIENT: import_zod.z.enum(["sqlite", "pg"]),
  PORT: import_zod.z.coerce.number().default(3333),
  NODE_ENV: import_zod.z.enum(["development", "test", "production"]).default("development")
});
var createTaskBodySchema = import_zod.z.object({
  task: import_zod.z.string(),
  description: import_zod.z.string(),
  type: import_zod.z.enum([
    "functionality",
    "bug",
    "refactoration",
    "research/study",
    "documentation"
  ]),
  status: import_zod.z.enum(["todo", "completed"]),
  priority: import_zod.z.enum(["low", "medium", "high"])
});
var getTaskParamsSchema = import_zod.z.object({
  id: import_zod.z.string()
});
var updateTaskBodySchema = import_zod.z.object({
  task: import_zod.z.string().optional(),
  description: import_zod.z.string().optional(),
  type: import_zod.z.enum([
    "functionality",
    "bug",
    "refactoration",
    "research/study",
    "documentation"
  ]).optional(),
  status: import_zod.z.enum(["todo", "completed"]).optional(),
  priority: import_zod.z.enum(["low", "medium", "high"]).optional()
});

// src/env/index.ts
if (process.env.NODE_ENV === "test") {
  (0, import_dotenv.config)({ path: ".env.test" });
} else {
  (0, import_dotenv.config)();
}
var _env = envSchema.safeParse(process.env);
if (_env.success === false) {
  throw new Error("Invalidate environment variables!");
}
var env = _env.data;

// src/database.ts
var config2 = {
  client: env.DATABASE_CLIENT,
  connection: {
    filename: env.DATABASE_URL
  },
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./db/migrations"
  }
};
var knex = (0, import_knex.knex)(config2);

// src/middlewares/check-session-id-exists.ts
var checkSessionIdExists = (request, reply) => __async(null, null, function* () {
  const sessionId = request.cookies.sessionId;
  if (!sessionId) {
    return reply.status(401).send({
      error: "Unauthorized"
    });
  }
});

// src/routes/tasks.ts
var tasksRoutes = (app2) => __async(null, null, function* () {
  app2.post("/", (request, reply) => __async(null, null, function* () {
    const bodyData = createTaskBodySchema.parse(request.body);
    const { status, task, type, description, priority } = bodyData;
    let sessionId = request.cookies.sessionId;
    if (!sessionId) {
      sessionId = (0, import_crypto.randomUUID)();
      reply.cookie("sessionId", sessionId, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7
        // 7 days
      });
    }
    yield knex("tasks").insert({
      id: (0, import_crypto.randomUUID)(),
      session_id: sessionId,
      task,
      description,
      type,
      status,
      priority
    });
    return reply.status(201).send();
  }));
  app2.get(
    "/",
    { preHandler: [checkSessionIdExists] },
    (request, reply) => __async(null, null, function* () {
      const { sessionId } = request.cookies;
      const tasks = yield knex("tasks").where("session_id", sessionId).select();
      reply.status(200).send({ tasks });
    })
  );
  app2.get(
    "/:id",
    { preHandler: [checkSessionIdExists] },
    (request, reply) => __async(null, null, function* () {
      const { id } = getTaskParamsSchema.parse(request.params);
      const { sessionId } = request.cookies;
      const task = yield knex("tasks").where({ session_id: sessionId, id }).first();
      reply.status(200).send({ task });
    })
  );
  app2.patch(
    "/:id",
    { preHandler: [checkSessionIdExists] },
    (request, reply) => __async(null, null, function* () {
      const { id } = getTaskParamsSchema.parse(request.params);
      const { sessionId } = request.cookies;
      const updates = updateTaskBodySchema.parse(request.body);
      if (Object.keys(updates).length === 0) {
        return reply.status(404).send({ message: "No data was sent" });
      }
      const updateTask = yield knex("tasks").where({ session_id: sessionId, id }).update(__spreadProps(__spreadValues({}, updates), {
        updated_at: knex.fn.now()
      })).returning("*");
      reply.status(200).send({ updateTask });
    })
  );
  app2.delete(
    "/:id",
    { preHandler: [checkSessionIdExists] },
    (request, reply) => __async(null, null, function* () {
      const { id } = getTaskParamsSchema.parse(request.params);
      const { sessionId } = request.cookies;
      yield knex("tasks").where({ session_id: sessionId, id }).delete();
      reply.status(200).send({
        message: "Task deleted successfully"
      });
    })
  );
});

// src/app.ts
var app = (0, import_fastify.default)();
app.register(import_cookie.default);
app.register(tasksRoutes, {
  prefix: "/tasks"
});

// src/server.ts
app.listen({
  port: env.PORT
}).then(() => {
  console.log("Server running");
});

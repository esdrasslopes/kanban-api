"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/database.ts
var database_exports = {};
__export(database_exports, {
  config: () => config2,
  knex: () => knex
});
module.exports = __toCommonJS(database_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  config,
  knex
});

import { z } from "zod";

export const envSchema = z.object({
  DATABASE_URL: z.string(),
  DATABASE_CLIENT: z.enum(["sqlite", "pg"]),
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

export const createTaskBodySchema = z.object({
  task: z.string(),
  type: z.enum([
    "functionality",
    "bug",
    "refactoration",
    "research/study",
    "documentation",
  ]),
  status: z.enum(["todo", "completed"]),
});

export const getTaskParamsSchema = z.object({
  id: z.string(),
});

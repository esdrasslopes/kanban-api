import "dotenv/config";

import { envSchema } from "../types";

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  throw new Error("Invalidate environment variables!");
}

export const env = _env.data;

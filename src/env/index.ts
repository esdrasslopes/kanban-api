import { config } from "dotenv";

import { envSchema } from "../types";

if (process.env.NODE_ENV === "test") {
  config({ path: ".env.test" });
} else {
  config();
}

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  throw new Error("Invalidate environment variables!");
}

export const env = _env.data;

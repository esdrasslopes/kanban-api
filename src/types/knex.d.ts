import { knex } from "knex";

declare module "knex/types/tables" {
  export interface Tables {
    tasks: {
      task: string;
      status: "todo" | "completed";
      type:
        | "functionality"
        | "bug"
        | "refactoration"
        | "research/study"
        | "documentation";
      id: string;
      session_id: string;
      created_at: string;
      updated_at: string;
    };
  }
}

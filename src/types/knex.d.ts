import { knex } from "knex";

declare module "knex/types/tables" {
  export interface Tables {
    tasks: {
      id: string;
      session_id: string;
      task: string;
      description: string;
      status: "todo" | "completed";
      type:
        | "functionality"
        | "bug"
        | "refactoration"
        | "research/study"
        | "documentation";
      priority: "low" | "medium" | "high";
      created_at: string;
      updated_at: string;
    };
  }
}

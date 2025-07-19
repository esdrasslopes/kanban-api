import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("tasks", (table) => {
    table.uuid("id").primary;
    table.string("task", 255).notNullable();
    table
      .enu("type", [
        "functionality",
        "bug",
        "refactoration",
        "research/study",
        "documentation",
      ])
      .notNullable();
    table.uuid("session_id").index;
    table.enu("status", ["todo", "completed"]);
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
    table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("tasks");
}

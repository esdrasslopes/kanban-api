import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("tasks", (table) => {
    table.string("description", 1000).notNullable().defaultTo("");
    table
      .enu("priority", ["low", "medium", "high"])
      .notNullable()
      .defaultTo("medium");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("tasks", (table) => {
    table.dropColumn("description");
    table.dropColumn("priority");
  });
}

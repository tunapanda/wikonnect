
exports.up = function(knex) {
  return knex.schema.createTable("xapi", (table) => {
    table.text("id").primary().notNullable().defaultTo(knex.raw("next_id()"));
    table.text("user_id");
    table
      .foreign("user_id")
      .references("users.id")
      .onDelete("SET NULL")
      .onUpdate("CASCADE");
    table.text("chapter_id");
    table
      .foreign("chapter_id")
      .references("chapters.id")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.jsonb("statement");
    table.timestamps();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("xapi");
};

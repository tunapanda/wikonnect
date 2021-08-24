exports.up = function (knex) {
  return knex("badge_triggers").insert([
    { name: "chapter_publish", description: "a chapter has been published" },
    { name: "chapter_approved", description: "a chapter has been approved" },
    { name: "comment_create", description: "a comment has been created" },
    { name: "comment_reply", description: "a comment has been replied to" },
    { name: "reaction_create", description: "a user has reacted to a chapter" },
    { name: "rating_create", description: "a user has rated a chapter" },
  ]);
};

exports.down = function (knex) {
  return knex("badge_triggers").whereIn("name", [
    "chapter_publish",
    "chapter_approved",
    "comment_create",
    "comment_reply",
    "reaction_create",
    "rating_create",
  ]).del();
};

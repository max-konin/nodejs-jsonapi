exports.up = async function(knex) {
  await knex.schema.createTable('posts', table => {
    table.increments('id');
    table.string('title');
    table.string('body');
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable('posts');
};

exports.up = async function(knex) {
  await knex.schema.createTable('comments', table => {
    table.increments('id');
    table.string('text');
    table.integer('post_id').unsigned();
    table
      .foreign('post_id')
      .references('posts.id')
      .onDelete('CASCADE');
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable('comments');
};

'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('list_items', function(table) {
    table.increments('id').primary();
    table.integer('list_id').references('lists.id');
    table.string('title', 255).notNullable();
    table.boolean('done').defaultTo(false);

    table.timestamp('created_at').defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').defaultTo(knex.raw('now()'));
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('list_items');
};

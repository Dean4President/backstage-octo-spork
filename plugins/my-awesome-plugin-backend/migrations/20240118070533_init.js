exports.up = (knex) => {
    knex.schema.createTable('my-awesome-table', (table) => {
        table.increments();
        table.string('vaule')
        table.timestamps();
    })
}

exports.down = (knex) => {};
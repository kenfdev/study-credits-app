import { sql, type Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('cardAccounts')
    .addColumn('id', 'text', (col) => col.primaryKey())
    .addColumn('isActive', 'boolean', (col) => col.notNull().defaultTo(true))
    .addColumn('rewardsStatus', 'text', (col) =>
      col.notNull().defaultTo('NONE')
    )
    .addColumn('createdAt', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`)
    )
    .addColumn('updatedAt', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`)
    )
    .execute();

  await db.schema
    .createTable('cardAccountUsers')
    .addColumn('id', 'text', (col) => col.primaryKey())
    .addColumn('cardAccountId', 'text', (col) =>
      col.notNull().references('cardAccounts.id').onDelete('cascade')
    )
    .addColumn('userId', 'text', (col) => col.notNull())
    .addColumn('role', 'text', (col) => col.notNull()) // for simplicty, not creating separate roles table
    .addColumn('createdAt', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`)
    )
    .execute();

  await db.schema
    .createIndex('cardAccountUsers_unique_idx')
    .on('cardAccountUsers')
    .columns(['cardAccountId', 'userId'])
    .unique()
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('cardAccountUsers').execute();
  await db.schema.dropTable('cardAccounts').execute();
}

import { sql, type Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('creditCards')
    .addColumn('id', 'text', (col) => col.primaryKey())
    .addColumn('cardAccountId', 'text', (col) =>
      col.notNull().references('cardAccounts.id').onDelete('cascade')
    )
    .addColumn('isActive', 'boolean', (col) => col.notNull().defaultTo(true))
    .addColumn('spendingLimit', 'decimal(12, 2)', (col) => col.notNull())
    .addColumn('createdAt', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`)
    )
    .addColumn('updatedAt', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`)
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('creditCards').execute();
}

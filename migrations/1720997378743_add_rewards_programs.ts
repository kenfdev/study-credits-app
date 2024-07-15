import { sql, type Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('rewardsPrograms')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('name', 'text', (col) => col.notNull())
    .addColumn('createdAt', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`)
    )
    .addColumn('updatedAt', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`)
    )
    .execute();

  await db.schema
    .createTable('rewardsProgramMembers')
    .addColumn('id', 'text', (col) => col.primaryKey())
    .addColumn('rewardsProgramId', 'integer', (col) =>
      col.notNull().references('rewardsPrograms.id').onDelete('cascade')
    )
    .addColumn('cardAccountId', 'text', (col) =>
      col.notNull().references('cardAccounts.id').onDelete('cascade')
    )
    .addColumn('createdAt', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`)
    )
    .execute();

  await db.schema
    .createIndex('rewardsProgramMembers_unique_idx')
    .on('rewardsProgramMembers')
    .columns(['rewardsProgramId', 'cardAccountId'])
    .unique()
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('rewardsProgramMembers').execute();
  await db.schema.dropTable('rewardsPrograms').execute();
}

import type { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('users')
    .addColumn('id', 'text', (col) => col.primaryKey())
    .addColumn('name', 'text')
    .addColumn('email', 'text', (col) => col.unique().notNull())
    .addColumn('emailVerified', 'timestamp')
    .addColumn('image', 'text')
    .execute();

  await db.schema
    .createTable('accounts')
    .addColumn('id', 'text', (col) => col.primaryKey())
    .addColumn('userId', 'text', (col) =>
      col.references('users.id').onDelete('cascade').notNull()
    )
    .addColumn('type', 'text', (col) => col.notNull())
    .addColumn('provider', 'text', (col) => col.notNull())
    .addColumn('providerAccountId', 'text', (col) => col.notNull())
    .addColumn('refresh_token', 'text')
    .addColumn('refresh_token_expires_in', 'bigint')
    .addColumn('access_token', 'text')
    .addColumn('expires_at', 'bigint')
    .addColumn('token_type', 'text')
    .addColumn('scope', 'text')
    .addColumn('id_token', 'text')
    .addColumn('session_state', 'text')
    .addUniqueConstraint('uniq_userId_provider', [
      'provider',
      'providerAccountId',
    ])
    .execute();

  // remove comment to use sessions and verificationTokens
  // await db.schema
  //   .createTable('sessions')
  //   .addColumn('id', 'text', (col) => col.primaryKey())
  //   .addColumn('sessionToken', 'text', (col) => col.unique().notNull())
  //   .addColumn('userId', 'text', (col) =>
  //     col.references('users.id').onDelete('cascade').notNull()
  //   )
  //   .addColumn('expires', 'timestamp', (col) => col.notNull())
  //   .execute();

  // await db.schema
  //   .createTable('verificationTokens')
  //   .addColumn('identifier', 'text')
  //   .addColumn('token', 'text', (col) => col.unique().notNull())
  //   .addColumn('expires', 'timestamp', (col) => col.notNull())
  //   .addPrimaryKeyConstraint('pk_id_token', ['identifier', 'token'])
  //   .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  // remove comment to use sessions and verificationTokens
  // db.schema.dropTable('verificationTokens').execute();
  // db.schema.dropTable('sessions').execute();
  db.schema.dropTable('accounts').execute();
  db.schema.dropTable('users').execute();
}

import { DB } from 'kysely-codegen'; // this is the Database interface we defined earlier
import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import { Adapter } from 'next-auth/adapters';
import { v4 as uuid } from 'uuid';

export const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<DB>({
  dialect,
});

export function KyselyAdapter(db: Kysely<DB>): Adapter {
  return {
    async createUser(user) {
      const [createdUser] = await db
        .insertInto('users')
        .values({ ...user, id: uuid() })
        .returningAll()
        .execute();
      return createdUser;
    },
    async getUser(id) {
      return (
        (await db
          .selectFrom('users')
          .selectAll()
          .where('id', '=', id)
          .executeTakeFirst()) ?? null
      );
    },
    async getUserByEmail(email) {
      return (
        (await db
          .selectFrom('users')
          .selectAll()
          .where('email', '=', email)
          .executeTakeFirst()) ?? null
      );
    },
    async getUserByAccount({ providerAccountId, provider }) {
      const account = await db
        .selectFrom('accounts')
        .innerJoin('users', 'users.id', 'accounts.userId')
        .selectAll('users')
        .where('accounts.providerAccountId', '=', providerAccountId)
        .where('accounts.provider', '=', provider)
        .executeTakeFirst();
      return account ?? null;
    },
    async updateUser(user) {
      const [updatedUser] = await db
        .updateTable('users')
        .set(user)
        .where('id', '=', user.id)
        .returningAll()
        .execute();
      return updatedUser;
    },
    async deleteUser(userId) {
      await db.deleteFrom('users').where('id', '=', userId).execute();
    },
    async linkAccount(account) {
      await db
        .insertInto('accounts')
        .values({ ...account, id: uuid() })
        .execute();
    },
    async unlinkAccount({ providerAccountId, provider }) {
      await db
        .deleteFrom('accounts')
        .where('providerAccountId', '=', providerAccountId)
        .where('provider', '=', provider)
        .execute();
    },
    // async createSession(session) {
    //   console.log('creating session', session)
    //   const [createdSession] = await db
    //     .insertInto('sessions')
    //     .values({ ...session, id: uuid() })
    //     .returningAll()
    //     .execute();
    //   return createdSession;
    // },
    // async getSessionAndUser(sessionToken) {
    //   const result = await db
    //     .selectFrom('sessions')
    //     .innerJoin('users', 'users.id', 'sessions.userId')
    //     .selectAll('sessions')
    //     .selectAll('users')
    //     .where('sessions.sessionToken', '=', sessionToken)
    //     .executeTakeFirst();
    //   if (!result) return null;
    //   const { id, ...user } = result;
    //   return {
    //     user: { ...user, id },
    //     session: { ...result, userId: result.id },
    //   };
    // },
    // async updateSession(session) {
    //   const [updatedSession] = await db
    //     .updateTable('sessions')
    //     .set(session)
    //     .where('sessionToken', '=', session.sessionToken)
    //     .returningAll()
    //     .execute();
    //   return updatedSession;
    // },
    // async deleteSession(sessionToken) {
    //   await db
    //     .deleteFrom('sessions')
    //     .where('sessionToken', '=', sessionToken)
    //     .execute();
    // },
    // async createVerificationToken(verificationToken) {
    //   const [createdToken] = await db
    //     .insertInto('verificationTokens')
    //     .values(verificationToken)
    //     .returningAll()
    //     .execute();
    //   return createdToken;
    // },
    // async useVerificationToken({ identifier, token }) {
    //   const [deletedToken] = await db
    //     .deleteFrom('verificationTokens')
    //     .where('identifier', '=', identifier)
    //     .where('token', '=', token)
    //     .returningAll()
    //     .execute();
    //   return deletedToken ?? null;
    // },
  };
}

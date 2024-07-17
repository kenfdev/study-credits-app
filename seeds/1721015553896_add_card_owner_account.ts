import type { Kysely } from 'kysely';
import { DB } from 'kysely-codegen';

const specialOwnerCardAccountId = 'special-owner-card-account';

export async function seed(db: Kysely<DB>): Promise<void> {
  const ownerUserId = process.env.ADMIN_USER_ID;
  if (!ownerUserId) {
    throw new Error('ADMIN_USER_ID is not set');
  }

  let [cardAccount] = await db
    .insertInto('cardAccounts')
    .values({
      id: specialOwnerCardAccountId,
      name: 'Owner Card',
      isActive: true,
    })
    .returningAll()
    .onConflict((oc) => oc.columns(['id']).doNothing())
    .execute();

  if (!cardAccount) {
    const [ca] = await db
      .selectFrom('cardAccounts')
      .selectAll()
      .where('id', '=', specialOwnerCardAccountId)
      .execute();
    cardAccount = ca;
  }

  await db
    .insertInto('cardAccountUsers')
    .values({
      cardAccountId: cardAccount.id,
      userId: ownerUserId,
      role: 'OWNER',
    })
    .onConflict((oc) => {
      return oc.columns(['cardAccountId', 'userId']).doNothing();
    })
    .execute();
}

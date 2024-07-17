import { db } from '@/app/_shared/lib/database';
import { CardAccount } from '@/app/api/_core/credit-card/queries/models/card-account';

type FetchCardAccountsInput = {
  userId: string;
};

export async function fetchCardAccounts({
  userId,
}: FetchCardAccountsInput): Promise<CardAccount[]> {
  const result = await db
    .selectFrom('cardAccounts')
    .innerJoin(
      'cardAccountUsers',
      'cardAccountUsers.cardAccountId',
      'cardAccounts.id'
    )
    .select([
      'cardAccounts.id',
      'cardAccounts.name',
      'cardAccounts.isActive',
      'cardAccounts.rewardsStatus',
    ])
    .where('cardAccountUsers.userId', '=', userId)
    .execute();

  return result;
}

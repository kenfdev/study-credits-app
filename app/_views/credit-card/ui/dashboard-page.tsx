import { auth } from '@shared/api/auth';
import { UserMenu } from '@shared/ui';
import { User } from '@shared/model';
import { getAuthorizedClient } from '@shared/api/rpc-client';
import { AccountsList } from '@/app/_widgets/credit-card/ui';

export const DashboardPage: () => Promise<JSX.Element> = async () => {
  const session = await auth();
  const client = getAuthorizedClient();
  const res = await client.api['card-accounts'].$get();
  if (res.status === 401) {
    return <p>Unauthorized</p>;
  }

  const result = await res.json();
  console.log('result', result);
  return (
    <div>
      <div className="flex flex-row justify-between">
        <AccountsList accounts={result.data} />
        <UserMenu user={session?.user as User} />
      </div>
    </div>
  );
};

import { CardAccount } from '../api';
import { FC } from 'react';

type Props = {
  accounts: CardAccount[];
};

export const AccountsList: FC<Props> = ({ accounts }) => {
  return (
    <div>
      <h2>Accounts</h2>
      <ul>
        {accounts.map((account) => (
          <li key={account.id}>
            {account.name} ({account.rewardsStatus})
          </li>
        ))}
      </ul>
    </div>
  );
};

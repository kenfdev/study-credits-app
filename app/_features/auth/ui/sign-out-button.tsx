'use client';

import { signOut } from 'next-auth/react';
import { FC } from 'react';

const SignOutButton: FC = () => {
  return <button onClick={() => signOut()}>Sign Out</button>;
};

export default SignOutButton;

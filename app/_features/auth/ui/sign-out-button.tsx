'use client';

import { signOut } from 'next-auth/react';
import { FC } from 'react';
import { Button } from '@nextui-org/button';

const SignOutButton: FC = () => {
  return <Button onClick={() => signOut()}>Sign Out</Button>;
};

export default SignOutButton;

'use client';

import { signIn } from 'next-auth/react';
import { FC } from 'react';
import { Button } from '@nextui-org/button';

const SignInButton: FC = () => {
  return (
    <Button
      className="w-[100px]"
      color="primary"
      onClick={() => signIn('github', { callbackUrl: '/dashboard', redirect: true })}
    >
      Sign In
    </Button>
  );
};

export default SignInButton;

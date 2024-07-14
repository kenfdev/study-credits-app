'use client';

import { signIn } from 'next-auth/react';
import { FC } from 'react';
import { Button } from '@nextui-org/button';

const SignInButton: FC = () => {
  return (
    <Button
      onClick={() => signIn('github', { callbackUrl: '/', redirect: true })}
    >
      Sign In
    </Button>
  );
};

export default SignInButton;

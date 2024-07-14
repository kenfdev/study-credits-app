'use client';

import { signIn } from 'next-auth/react';
import { FC } from 'react';

const SignInButton: FC = () => {
  return (
    <button
      onClick={() => signIn('github', { callbackUrl: '/', redirect: true })}
    >
      Sign In
    </button>
  );
};

export default SignInButton;

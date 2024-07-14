import authConfig from './auth.config';
import { KyselyAdapter } from '@/app/_shared/lib/database';
import { db } from '@shared/lib/database';
import NextAuth from 'next-auth';

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: KyselyAdapter(db),
  session: { strategy: 'jwt' },
});

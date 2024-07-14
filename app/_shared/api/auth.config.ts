import GitHubProvider from 'next-auth/providers/github';
import type { NextAuthConfig } from 'next-auth';

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
} satisfies NextAuthConfig;

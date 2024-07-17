import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { getToken, JWT } from '@auth/core/jwt';

import { fetchCardAccounts } from '@/app/api/_core/credit-card/queries/fetch-card-accounts';

export const config = {
  runtime: 'edge',
};

type Variables = {
  token: JWT | null;
};

const app = new Hono<{ Variables: Variables }>().basePath('/api');

app.use('*', async (c, next) => {
  // https://github.com/nextauthjs/next-auth/discussions/9133#discussioncomment-9120827
  const token = await getToken({
    req: c.req.raw,
    secret: process.env.AUTH_SECRET ?? '',
    secureCookie: process.env.NODE_ENV === 'production',
    salt:
      process.env.NODE_ENV === 'production'
        ? '__Secure-authjs.session-token'
        : 'authjs.session-token',
  });
  c.set('token', token);
  await next();
});

const route = app
  .get('/hello', async (c) => {
    const token = c.get('token');
    return c.json({
      message: 'Hello from Hono!',
    });
  })
  .get('/card-accounts', async (c) => {
    const token = c.get('token');
    if (!token || !token.sub) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const result = await fetchCardAccounts({ userId: token.sub });
    return c.json(
      {
        data: result,
      },
      200
    );
  });

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof route;

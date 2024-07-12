import { Hono } from 'hono';
import { handle } from 'hono/vercel';

export const config = {
  runtime: 'edge',
};

const app = new Hono().basePath('/api');

const route = app.get('/hello', (c) => {
  return c.json({
    message: 'Hello from Hono!',
  });
});

export const GET = handle(app);
export type AppType = typeof route;

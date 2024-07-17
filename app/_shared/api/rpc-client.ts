import { AppType } from '@/app/api/[...route]/route';
import { hc } from 'hono/client';
import { cookies } from 'next/headers';

export const getAuthorizedClient = () => {
  const c = cookies();
  const t = c.get('authjs.session-token')?.value;
  return hc<AppType>('http://localhost:3333/', {
    headers: {
      authorization: `Bearer ${t ?? ''}`,
    },
  });
};

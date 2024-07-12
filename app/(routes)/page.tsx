import { client } from '@shared/api/rpc-client';

export default async function Page() {
  const res = await client.api.hello.$get();
  // const res = await fetch('/api/hello');
  const { message } = await res.json();
  return <p>{message}</p>;
}

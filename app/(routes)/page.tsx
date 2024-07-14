import SignOutButton from '@/app/_features/auth/ui/sign-out-button';
import { auth } from '@/app/_shared/api/auth';
import { client } from '@shared/api/rpc-client';

export default async function Page() {
  const session = await auth();
  const res = await client.api.hello.$get();
  const { message } = await res.json();
  return (
    <>
      <p>{message}</p>
      {session?.user && (
        <div>
          <SignOutButton />
        </div>
      )}
    </>
  );
}

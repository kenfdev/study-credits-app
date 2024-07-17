import { auth } from '@/app/_shared/api/auth';

export default async function Page() {
  const session = await auth();
  return session?.user && <div>HELLO</div>;
}

import SignInButton from '@/app/_features/auth/ui/sign-in-button';

export default async function Page() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <SignInButton />
    </div>
  );
}

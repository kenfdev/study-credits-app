import '@global/ui/globals.css';
import { Providers } from '@global/ui/providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <main className="container mx-auto my-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}

import '../styles/main.scss';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { TEXT } from '../lib/text';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchApi } from '../lib/api';
import type { NavigationResponse } from '@org/shared-types';

export const metadata = {
  title: TEXT.nav.brandName,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nav = await fetchApi<NavigationResponse>(
    '/api/navigation',
    { next: { revalidate: 60 } },
  ).catch(() => null);

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <Header
              brandName={nav?.brandName}
              logoUrl={nav?.logoUrl}
              navLinks={nav?.navLinks}
            />
            {children}
            <Footer footerLinks={nav?.footerLinks} />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

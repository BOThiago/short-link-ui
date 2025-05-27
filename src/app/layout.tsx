import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Short Link - Encurtador de URLs',
  description: 'Encurtador de URLs profissional com análise de dados',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600">
        {children}
      </body>
    </html>
  );
}

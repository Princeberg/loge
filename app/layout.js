// app/layout.js
import './globals.css';
import { Inter } from '@fontsource/inter/400.css';
import { Inter as InterSemiBold } from '@fontsource/inter/600.css';
import { Inter as InterBold } from '@fontsource/inter/700.css';

export const metadata = {
  title: 'Loge Connect ',
  description: 'Découvrez nos biens exclusifs à la vente, location et séjour',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        {/* Global favicon */}
        <link rel="icon" href="/logo.png" />
       
        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-papN4fwwk3B5rC+QZZ4Gy8T+zH5fAvy0svVv3t4ZgYo4ZJmG2S1ylE23o8c9wF3xzblLkX8T+y0lm2vILXXAfA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#26294a" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Loge Connect" />
      </head>
      <body className="font-inter">
        {children}
      </body>
    </html>
  );
}
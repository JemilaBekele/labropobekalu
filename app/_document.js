
// pages/_document.js

import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      
      <meta name="application-name" content="lab App" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
<meta name="apple-mobile-web-app-title" content="lab App" />
<meta name="description" content="Best lab App in the world" />
<meta name="format-detection" content="telephone=no" />
<meta name="mobile-web-app-capable" content="yes" />
<meta name="msapplication-config" content="/icons/browserconfig.xml" />
<meta name="msapplication-TileColor" content="#2B5797" />
<meta name="msapplication-tap-highlight" content="no" />
<meta name="theme-color" content="#000000" />

<link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
<link rel="apple-touch-icon" sizes="152x152" href="/logo.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
<link rel="apple-touch-icon" sizes="167x167" href="/logo.png" />

<link rel="icon" type="image/png" sizes="32x32" href="/logo.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/logo.png" />
<link rel="manifest" href="/manifest.json" />
<link rel="mask-icon" href="/favicon.ico" color="#5bbad5" />
<link rel="shortcut icon" href="/favicon.ico" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />

<meta name="twitter:card" content="summary" />
<meta property="og:type" content="website" />
<meta property="og:title" content="PWA App" />
<meta property="og:description" content="Best PWA App in the world" />
<meta property="og:site_name" content="PWA App" />


      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

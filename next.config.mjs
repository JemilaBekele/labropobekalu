// next.config.js or next.config.mjs
import nextPWA from 'next-pwa';

const withPWA = nextPWA({
  // Disable PWA in development mode
  register: true, // Automatically registers the service worker
  skipWaiting: true, 
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',// Disable in development
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'pages',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
        },
      },
    },
  ],
});

export default withPWA({
  // Other Next.js configuration options
  reactStrictMode: true, // Enables strict mode for React
  swcMinify: true, // Enables SWC-based minification

  // Custom Webpack configuration (if needed)
  webpack(config) {
    // Example: add custom webpack rules or plugins
    return config;
  },

  // Environment variables (if needed)
  env: {
    CUSTOM_API_ENDPOINT: process.env.CUSTOM_API_ENDPOINT || 'http://localhost:3000',
  },

  // Internationalization (if needed)
  i18n: {
    locales: ['en', 'fr', 'es'], // Add your supported languages
    defaultLocale: 'en', // Default language
  },
});

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');

  const isProduction = mode === 'production';
  const isStaging = mode === 'staging';
  const isDevelopment = mode === 'development';

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    define: {
      // Expose environment variables to the client
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
      __BUILD_MODE__: JSON.stringify(mode),
    },
    build: {
      // Production optimizations
      minify: isProduction ? 'esbuild' : false,
      cssMinify: isProduction,
      reportCompressedSize: isProduction,
      chunkSizeWarningLimit: 1000,

      rollupOptions: {
        output: {
          // Separate chunks for better caching
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
            ui: ['framer-motion', 'lucide-react'],
            forms: ['zod'],
            utils: ['clsx', 'tailwind-merge', 'class-variance-authority'],
          },
          // Optimize asset file names with proper cache headers
          assetFileNames: assetInfo => {
            const info = assetInfo.names?.[0]?.split('.') || [];
            const ext = info[info.length - 1];

            if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp|avif/i.test(ext || '')) {
              return `assets/images/[name]-[hash][extname]`;
            }
            if (/woff2?|eot|ttf|otf/i.test(ext || '')) {
              return `assets/fonts/[name]-[hash][extname]`;
            }
            if (/css/i.test(ext || '')) {
              return `assets/css/[name]-[hash][extname]`;
            }
            return `assets/[name]-[hash][extname]`;
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
        },
      },

      // Asset optimization
      assetsInlineLimit: isProduction ? 4096 : 0, // 4kb - inline smaller assets as base64 in production
      cssCodeSplit: true,
      sourcemap: isDevelopment || isStaging, // Enable sourcemaps for dev and staging

      // Target modern browsers for better optimization
      target: 'es2020',

      // Output directory based on environment
      outDir: isStaging ? 'dist-staging' : 'dist',
    },

    // Asset optimization
    assetsInclude: ['**/*.webp', '**/*.avif'],

    // Performance optimizations
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'framer-motion',
        'lucide-react',
        'zod',
        'sonner',
        'next-themes',
      ],
    },

    // Server configuration for different environments
    server: {
      port: 8080,
      host: true,
      open: isDevelopment,
      strictPort: false,
    },

    // Preview server configuration
    preview: {
      port: 4173,
      host: true,
      strictPort: false,
    },

    // Environment-specific base URL
    base: env.VITE_BASE_URL || '/',
  };
});

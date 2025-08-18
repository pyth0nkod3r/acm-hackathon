/**
 * Deployment Configuration
 * Defines settings for different deployment environments
 */

export const deploymentConfig = {
  development: {
    name: 'Development',
    buildCommand: 'npm run build:development',
    outputDir: 'dist',
    baseUrl: '/',
    enableSourcemaps: true,
    enableCompression: false,
    cacheHeaders: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    },
  },

  staging: {
    name: 'Staging',
    buildCommand: 'npm run build:staging',
    outputDir: 'dist-staging',
    baseUrl: '/',
    enableSourcemaps: true,
    enableCompression: true,
    cacheHeaders: {
      // HTML files - no cache
      '**/*.html': {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
      // Static assets with hash - long cache
      '**/assets/**/*.{js,css,png,jpg,jpeg,gif,svg,webp,avif,woff,woff2}': {
        'Cache-Control': 'public, max-age=31536000, immutable',
        Expires: new Date(Date.now() + 31536000000).toUTCString(),
      },
      // Other assets - medium cache
      '**/*.{ico,json,txt}': {
        'Cache-Control': 'public, max-age=86400',
        Expires: new Date(Date.now() + 86400000).toUTCString(),
      },
    },
  },

  production: {
    name: 'Production',
    buildCommand: 'npm run build:production',
    outputDir: 'dist',
    baseUrl: '/',
    enableSourcemaps: false,
    enableCompression: true,
    cacheHeaders: {
      // HTML files - no cache for fresh content
      '**/*.html': {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
      // Static assets with hash - long cache (1 year)
      '**/assets/**/*.{js,css,png,jpg,jpeg,gif,svg,webp,avif,woff,woff2}': {
        'Cache-Control': 'public, max-age=31536000, immutable',
        Expires: new Date(Date.now() + 31536000000).toUTCString(),
      },
      // Favicon and manifest - medium cache (1 day)
      '**/*.{ico,json,txt}': {
        'Cache-Control': 'public, max-age=86400',
        Expires: new Date(Date.now() + 86400000).toUTCString(),
      },
      // Service worker - no cache
      '**/sw.js': {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    },
    securityHeaders: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Content-Security-Policy':
        "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self';",
    },
  },
};

/**
 * Get configuration for specific environment
 * @param {string} environment - The target environment
 * @returns {object} Environment configuration
 */
export function getDeploymentConfig(environment = 'production') {
  const config = deploymentConfig[environment];
  if (!config) {
    throw new Error(`Unknown deployment environment: ${environment}`);
  }
  return config;
}

/**
 * Generate .htaccess content for Apache servers
 * @param {string} environment - The target environment
 * @returns {string} .htaccess content
 */
export function generateHtaccess(environment = 'production') {
  const config = getDeploymentConfig(environment);

  let htaccess = `# Africa Creative Market Hackathon - ${config.name} Environment
# Generated automatically - do not edit manually

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
    AddOutputFilterByType DEFLATE application/json
</IfModule>

# Enable Gzip compression
<IfModule mod_gzip.c>
    mod_gzip_on Yes
    mod_gzip_dechunk Yes
    mod_gzip_item_include file \\.(html?|txt|css|js|php|pl)$
    mod_gzip_item_include mime ^application/x-javascript.*
    mod_gzip_item_include mime ^text/.*
    mod_gzip_item_exclude rspheader ^Content-Encoding:.*gzip.*
</IfModule>

# Cache headers
<IfModule mod_expires.c>
    ExpiresActive On
    
    # HTML files - no cache
    ExpiresByType text/html "access plus 0 seconds"
    
    # Static assets with hash - long cache
    <FilesMatch "\\.(js|css|png|jpg|jpeg|gif|svg|webp|avif|woff|woff2)$">
        ExpiresDefault "access plus 1 year"
        Header set Cache-Control "public, max-age=31536000, immutable"
    </FilesMatch>
    
    # Other assets - medium cache
    <FilesMatch "\\.(ico|json|txt)$">
        ExpiresDefault "access plus 1 day"
        Header set Cache-Control "public, max-age=86400"
    </FilesMatch>
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# SPA routing - redirect all requests to index.html
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase ${config.baseUrl}
    
    # Handle Angular and React Router
    RewriteRule ^index\\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . ${config.baseUrl}index.html [L]
</IfModule>

# Prevent access to sensitive files
<FilesMatch "\\.(env|log|htaccess|htpasswd|ini|phps|fla|psd|log|sh)$">
    Order Allow,Deny
    Deny from all
</FilesMatch>
`;

  return htaccess;
}

export default deploymentConfig;

# AfCFTA Hackathon - Deployment Guide

This guide covers deployment strategies for the AfCFTA Digital Trade Protocol Hackathon React application across different environments.

## Table of Contents

- [Quick Start](#quick-start)
- [Environment Configuration](#environment-configuration)
- [Build Commands](#build-commands)
- [Deployment Methods](#deployment-methods)
- [Server Configuration](#server-configuration)
- [Docker Deployment](#docker-deployment)
- [Performance Optimization](#performance-optimization)
- [Monitoring and Health Checks](#monitoring-and-health-checks)

## Quick Start

### Development

```bash
npm install
npm run dev
```

### Production Build

```bash
npm run deploy:production
```

## Environment Configuration

The application supports three environments with specific configurations:

### Development

- **File**: `.env.development`
- **Build Output**: `dist/`
- **Features**: Hot reload, sourcemaps, debug mode
- **API**: Mock API enabled

### Staging

- **File**: `.env.staging`
- **Build Output**: `dist-staging/`
- **Features**: Sourcemaps, error reporting, staging API
- **API**: Staging API endpoint

### Production

- **File**: `.env.production`
- **Build Output**: `dist/`
- **Features**: Optimized build, analytics, production API
- **API**: Production API endpoint

### Environment Variables

Required environment variables for each environment:

```bash
# API Configuration
VITE_API_BASE_URL=https://api.afcfta-hackathon.com
VITE_API_USERNAME=your_username
VITE_API_PASSWORD=your_password

# Feature Flags
VITE_ENABLE_ANIMATIONS=true
VITE_ENABLE_FORM_VALIDATION=true
VITE_ENABLE_DEBUG_MODE=false

# Performance
VITE_ENABLE_SOURCEMAPS=false
VITE_ENABLE_COMPRESSION=true
```

## Build Commands

### Basic Build Commands

```bash
# Development build
npm run build:development

# Staging build
npm run build:staging

# Production build
npm run build:production

# Build with bundle analysis
npm run build:analyze
```

### Deployment Commands

```bash
# Full deployment preparation (recommended)
npm run deploy:production    # Includes tests, linting, build, and artifacts
npm run deploy:staging       # Staging deployment
npm run deploy:development   # Development deployment

# Health check
npm run health-check

# Clean builds
npm run clean
npm run clean:all
```

## Deployment Methods

### 1. Static Hosting (Recommended)

#### Netlify

1. Connect your repository to Netlify
2. Set build command: `npm run deploy:production`
3. Set publish directory: `dist`
4. Configure environment variables in Netlify dashboard

#### Vercel

1. Connect your repository to Vercel
2. Set build command: `npm run build:production`
3. Set output directory: `dist`
4. Configure environment variables in Vercel dashboard

#### AWS S3 + CloudFront

```bash
# Build the application
npm run deploy:production

# Upload to S3 (using AWS CLI)
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

### 2. Traditional Web Server

#### Apache

1. Build the application: `npm run deploy:production`
2. Upload `dist/` contents to your web server
3. Use the generated `.htaccess` file for proper routing and caching

#### Nginx

1. Build the application: `npm run deploy:production`
2. Upload `dist/` contents to your web server
3. Use the generated `nginx.conf` for server configuration

### 3. Docker Deployment

#### Build and Run

```bash
# Build Docker image
docker build -t afcfta-hackathon .

# Run container
docker run -p 80:80 afcfta-hackathon
```

#### Docker Compose

```bash
# Production deployment
docker-compose up -d

# Development with hot reload
docker-compose --profile dev up
```

## Server Configuration

### Apache (.htaccess)

The build process generates an optimized `.htaccess` file with:

- Gzip compression
- Cache headers for static assets
- SPA routing support
- Security headers

### Nginx

The build process generates an `nginx.conf` with:

- Gzip compression
- Optimized cache headers
- SPA routing support
- Security headers
- Health check endpoint

### Example Nginx Server Block

```nginx
server {
    listen 80;
    server_name hackathon.afcfta.com;
    root /var/www/hackathon/dist;
    index index.html;

    # Include generated configuration
    include /var/www/hackathon/dist/nginx.conf;
}
```

## Performance Optimization

### Build Optimizations

- **Code Splitting**: Automatic route-based and vendor splitting
- **Asset Optimization**: Images, fonts, and CSS optimization
- **Tree Shaking**: Unused code elimination
- **Minification**: JavaScript and CSS minification
- **Compression**: Gzip compression for all text assets

### Caching Strategy

- **HTML Files**: No cache (immediate updates)
- **Static Assets**: 1 year cache with immutable flag
- **Other Assets**: 1 day cache

### Bundle Analysis

```bash
npm run build:analyze
```

This generates a bundle analysis report to identify optimization opportunities.

## Monitoring and Health Checks

### Health Check Endpoint

The application includes a health check endpoint at `/health` that returns:

- Application status
- Build information
- Environment details

### Deployment Verification

```bash
# Run health check after deployment
npm run health-check

# Or manually check
curl https://your-domain.com/health
```

### Performance Monitoring

Monitor these key metrics:

- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Input Delay (FID)**: < 100ms

## Troubleshooting

### Common Issues

#### Build Failures

1. Check TypeScript errors: `npm run type-check`
2. Check linting errors: `npm run lint`
3. Check test failures: `npm run test:run`

#### Routing Issues

- Ensure your server is configured for SPA routing
- Check that `.htaccess` or nginx configuration is properly applied

#### Environment Variables

- Verify all required environment variables are set
- Check that variables are prefixed with `VITE_`

#### Performance Issues

- Run bundle analysis: `npm run build:analyze`
- Check network tab for large assets
- Verify compression is enabled on your server

### Support

For deployment issues, check:

1. Build logs for errors
2. Browser console for runtime errors
3. Network tab for failed requests
4. Server logs for configuration issues

## Security Considerations

### Content Security Policy

The application includes a basic CSP header. Customize it based on your needs:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.afcfta-hackathon.com;
```

### Environment Variables

- Never commit `.env.local` or `.env.production` files
- Use your hosting platform's environment variable management
- Rotate API credentials regularly

### HTTPS

Always deploy with HTTPS enabled:

- Use Let's Encrypt for free SSL certificates
- Configure HSTS headers
- Redirect HTTP to HTTPS

## Rollback Strategy

### Quick Rollback

1. Keep previous build artifacts
2. Use atomic deployments when possible
3. Have a rollback script ready

### Example Rollback Script

```bash
#!/bin/bash
# rollback.sh
BACKUP_DIR="dist-backup-$(date +%Y%m%d-%H%M%S)"
mv dist $BACKUP_DIR
mv dist-previous dist
echo "Rolled back to previous version. Backup saved as $BACKUP_DIR"
```

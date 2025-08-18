#!/usr/bin/env node

/**
 * Health check script for deployment verification
 * Validates that the build artifacts are properly generated
 */

import { existsSync, statSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function checkBuildArtifacts(distDir = 'dist') {
  const distPath = join(projectRoot, distDir);

  log(`\n🔍 Checking build artifacts in ${distDir}/...`, colors.blue);

  if (!existsSync(distPath)) {
    log(`❌ Build directory ${distDir}/ not found`, colors.red);
    return false;
  }

  // Check for essential files
  const requiredFiles = ['index.html', 'assets'];

  let allFilesExist = true;

  for (const file of requiredFiles) {
    const filePath = join(distPath, file);
    if (existsSync(filePath)) {
      const stats = statSync(filePath);
      if (stats.isDirectory()) {
        log(`✅ Directory ${file}/ exists`, colors.green);
      } else {
        const sizeKB = (stats.size / 1024).toFixed(2);
        log(`✅ File ${file} exists (${sizeKB} KB)`, colors.green);
      }
    } else {
      log(`❌ Required file/directory ${file} not found`, colors.red);
      allFilesExist = false;
    }
  }

  // Check assets directory structure
  const assetsPath = join(distPath, 'assets');
  if (existsSync(assetsPath)) {
    const expectedAssetDirs = ['js', 'css'];
    for (const dir of expectedAssetDirs) {
      const assetDirPath = join(assetsPath, dir);
      if (existsSync(assetDirPath)) {
        log(`✅ Assets directory ${dir}/ exists`, colors.green);
      } else {
        log(`⚠️  Assets directory ${dir}/ not found`, colors.yellow);
      }
    }
  }

  // Check index.html content
  const indexPath = join(distPath, 'index.html');
  if (existsSync(indexPath)) {
    const indexContent = readFileSync(indexPath, 'utf-8');
    if (indexContent.includes('<div id="root">')) {
      log('✅ index.html contains root div', colors.green);
    } else {
      log('❌ index.html missing root div', colors.red);
      allFilesExist = false;
    }

    if (indexContent.includes('assets/')) {
      log('✅ index.html references assets', colors.green);
    } else {
      log('⚠️  index.html may not reference built assets', colors.yellow);
    }
  }

  return allFilesExist;
}

function checkEnvironmentConfig() {
  log('\n🔧 Checking environment configuration...', colors.blue);

  const envFiles = [
    '.env.example',
    '.env.development',
    '.env.staging',
    '.env.production',
  ];

  let configValid = true;

  for (const envFile of envFiles) {
    const envPath = join(projectRoot, envFile);
    if (existsSync(envPath)) {
      log(`✅ Environment file ${envFile} exists`, colors.green);
    } else {
      log(`❌ Environment file ${envFile} not found`, colors.red);
      configValid = false;
    }
  }

  return configValid;
}

function checkPackageJson() {
  log('\n📦 Checking package.json configuration...', colors.blue);

  const packagePath = join(projectRoot, 'package.json');
  if (!existsSync(packagePath)) {
    log('❌ package.json not found', colors.red);
    return false;
  }

  const packageJson = JSON.parse(readFileSync(packagePath, 'utf-8'));

  const requiredScripts = [
    'build:development',
    'build:staging',
    'build:production',
    'deploy:staging',
    'deploy:production',
  ];

  let scriptsValid = true;

  for (const script of requiredScripts) {
    if (packageJson.scripts && packageJson.scripts[script]) {
      log(`✅ Script "${script}" configured`, colors.green);
    } else {
      log(`❌ Script "${script}" missing`, colors.red);
      scriptsValid = false;
    }
  }

  return scriptsValid;
}

function main() {
  log('🚀 ACM Hackathon - Deployment Health Check', colors.blue);
  log('================================================', colors.blue);

  const checks = [
    checkEnvironmentConfig(),
    checkPackageJson(),
    checkBuildArtifacts('dist'),
  ];

  // Check staging build if it exists
  if (existsSync(join(projectRoot, 'dist-staging'))) {
    checks.push(checkBuildArtifacts('dist-staging'));
  }

  const allPassed = checks.every(check => check);

  log('\n📊 Health Check Summary:', colors.blue);
  log('========================', colors.blue);

  if (allPassed) {
    log('✅ All checks passed! Deployment ready.', colors.green);
    process.exit(0);
  } else {
    log('❌ Some checks failed. Please review the issues above.', colors.red);
    process.exit(1);
  }
}

main();

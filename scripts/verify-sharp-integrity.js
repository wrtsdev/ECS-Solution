#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

try {
  const sharpPath = path.join(__dirname, '../node_modules/sharp/package.json');
  const pkg = JSON.parse(fs.readFileSync(sharpPath, 'utf-8'));
  if (pkg.version !== '0.35.5') {
    console.error('Error: sharp version mismatch');
    process.exit(1);
  }
  console.log('sharp integrity verified');
} catch (err) {
  console.error('Verification failed:', err.message);
  process.exit(1);
}


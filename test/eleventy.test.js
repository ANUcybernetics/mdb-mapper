import { describe, it, expect, beforeAll } from 'vitest';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

describe('Eleventy Build', () => {
  beforeAll(async () => {
    // Clean build directory
    try {
      await fs.rm(path.join(process.cwd(), '_site'), { recursive: true, force: true });
    } catch (e) {
      // Directory might not exist
    }
  });

  it('should build without errors', async () => {
    const { stdout, stderr } = await execAsync('npm run build');
    expect(stderr).toBe('');
    expect(stdout).toContain('Wrote');
  }, 30000);

  it('should generate index.html', async () => {
    await execAsync('npm run build');
    const indexPath = path.join(process.cwd(), '_site', 'index.html');
    const exists = await fs.access(indexPath).then(() => true).catch(() => false);
    expect(exists).toBe(true);
    
    const content = await fs.readFile(indexPath, 'utf-8');
    expect(content).toContain('Murray Darling Basin');
    expect(content).toContain('id="map"');
  });

  it('should generate about page', async () => {
    await execAsync('npm run build');
    const aboutPath = path.join(process.cwd(), '_site', 'about', 'index.html');
    const exists = await fs.access(aboutPath).then(() => true).catch(() => false);
    expect(exists).toBe(true);
    
    const content = await fs.readFile(aboutPath, 'utf-8');
    expect(content).toContain('About Murray Darling Basin Mapper');
  });

  it('should copy static assets', async () => {
    await execAsync('npm run build');
    
    // Check CSS
    const cssPath = path.join(process.cwd(), '_site', 'css', 'main.css');
    const cssExists = await fs.access(cssPath).then(() => true).catch(() => false);
    expect(cssExists).toBe(true);
    
    // Check JS
    const jsPath = path.join(process.cwd(), '_site', 'js', 'map.js');
    const jsExists = await fs.access(jsPath).then(() => true).catch(() => false);
    expect(jsExists).toBe(true);
    
    // Check Leaflet
    const leafletCssPath = path.join(process.cwd(), '_site', 'lib', 'leaflet', 'leaflet.css');
    const leafletExists = await fs.access(leafletCssPath).then(() => true).catch(() => false);
    expect(leafletExists).toBe(true);
  });
});
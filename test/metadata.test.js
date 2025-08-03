import { describe, it, expect } from 'vitest';
import fs from 'fs/promises';
import path from 'path';

describe('Tile Metadata', () => {
  it('should have valid metadata structure', async () => {
    const metadataPath = path.join(process.cwd(), 'src', 'data', 'tile-metadata.json');
    const content = await fs.readFile(metadataPath, 'utf-8');
    const metadata = JSON.parse(content);
    
    expect(metadata).toHaveProperty('name');
    expect(metadata).toHaveProperty('timeSeries');
    expect(metadata.timeSeries).toBeInstanceOf(Array);
    expect(metadata.timeSeries.length).toBeGreaterThan(0);
  });

  it('should have valid time series entries', async () => {
    const metadataPath = path.join(process.cwd(), 'src', 'data', 'tile-metadata.json');
    const content = await fs.readFile(metadataPath, 'utf-8');
    const metadata = JSON.parse(content);
    
    metadata.timeSeries.forEach(entry => {
      expect(entry).toHaveProperty('date');
      expect(entry).toHaveProperty('tileUrl');
      expect(entry).toHaveProperty('maxZoom');
      expect(entry).toHaveProperty('minZoom');
      
      // Validate date format
      expect(() => new Date(entry.date)).not.toThrow();
      
      // Validate zoom levels
      expect(entry.minZoom).toBeLessThan(entry.maxZoom);
      expect(entry.minZoom).toBeGreaterThanOrEqual(0);
      expect(entry.maxZoom).toBeLessThanOrEqual(20);
    });
  });

  it('should have valid bounds', async () => {
    const metadataPath = path.join(process.cwd(), 'src', 'data', 'tile-metadata.json');
    const content = await fs.readFile(metadataPath, 'utf-8');
    const metadata = JSON.parse(content);
    
    expect(metadata.bounds).toBeDefined();
    expect(metadata.bounds.north).toBeGreaterThan(metadata.bounds.south);
    expect(metadata.bounds.east).toBeGreaterThan(metadata.bounds.west);
    
    // Check if bounds are within Australia
    expect(metadata.bounds.south).toBeGreaterThan(-45);
    expect(metadata.bounds.north).toBeLessThan(-10);
    expect(metadata.bounds.west).toBeGreaterThan(110);
    expect(metadata.bounds.east).toBeLessThan(160);
  });
});
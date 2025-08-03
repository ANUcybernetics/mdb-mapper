# MDB-Mapper

A web-based interactive (aerial photography) map of the Murray Darling Basin
which includes historical data and satellite imagery. This gives the viewer with
the ability to see how the landscape has changed over time.

## Getting Started

### Prerequisites
- Node.js (latest version via mise or system install)
- npm
- AWS CLI (for S3 uploads)

### Installation
```bash
npm install
```

### Development
Start the development server with hot reloading:
```bash
npm run serve
```
Visit http://localhost:8080 to view the site.

### Production Build
Build the static site:
```bash
npm run build
```
Output will be in the `_site` directory.

### Testing
```bash
npm test          # Run tests in watch mode
npm run test:run  # Run tests once
```

## Using the Map

- **Pan/Zoom**: Click and drag to pan, scroll to zoom
- **Time Navigation**: 
  - Use the slider at the bottom to move through time
  - Ctrl/Cmd + scroll for quick time navigation
- **View Locations**: Click on the map to explore different areas

## S3 Tile Upload

### Setup
1. Configure AWS credentials:
   ```bash
   aws configure
   ```
2. Set environment variables:
   ```bash
   export S3_BUCKET_NAME=your-tile-bucket
   export AWS_REGION=ap-southeast-2
   ```

### Upload Tiles
```bash
./scripts/upload-tiles.js <tiles-directory> <date-string>
```

Example:
```bash
./scripts/upload-tiles.js ./tiles/2024-01-15 2024-01-15
```

The tiles directory should have the structure:
```
tiles/2024-01-15/
├── 5/    # zoom level
│   ├── 10/    # x coordinate
│   │   ├── 12.png    # y coordinate
│   │   └── 13.png
│   └── 11/
│       └── 12.png
└── 6/
    └── ...
```

After uploading, the script will update `src/data/tile-metadata.json` automatically.

## Authors

Bill McAlister, Ben Swift

## LICENCE

MIT

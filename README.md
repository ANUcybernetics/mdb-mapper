# MDB-Mapper

A web-based interactive (aerial photography) map of the Murray Darling Basin
which includes historical satellite imagery. This gives the viewer with the
ability to see how the landscape has changed over time.

## Tech Stack

- **Build Tool**: Vite (for modern JavaScript bundling and development)
- **Static Site Generator**: Eleventy (11ty)
- **Testing**: Vitest
- **Linting**: ESLint (configured for modern JS and functional programming)
- **Map Library**: Leaflet
- **Language**: Modern JavaScript (ES modules)

## Getting Started

### Prerequisites

- `node` & `npm`
- `uv` (optional, only if you want to use python scripts for data processing)

All deps are tested with their latest versions---they may work with older
versions too.

If you use [mise](https://mise.jdx.dev/installing-mise.html) to manage your dev
environment you can install everything with g`mise install`. But you can set
things up a different way if that's your preference.

### Installation

```bash
npm install
```

### Development

Start the Vite development server with hot module replacement:

```bash
npm run dev
```

Visit <http://localhost:5173> to view the site with live reloading.

### Production Build

Build the production site (Vite bundles assets, then Eleventy generates static
HTML):

```bash
npm run build
```

Output will be in the `_site` directory.

To preview the production build:

```bash
npm run serve
```

### Testing

```bash
npm test          # Run tests in watch mode
npm run test:run  # Run tests once
```

### Linting

```bash
npm run lint      # Check code style
npm run lint:fix  # Auto-fix code style issues
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

After uploading, the script will update `src/data/tile-metadata.json`
automatically.

## Authors

Bill McAlister, Ben Swift

## LICENSE

MIT

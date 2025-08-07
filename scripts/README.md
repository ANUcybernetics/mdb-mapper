# MDB Mapper Scripts

This directory contains utility scripts for data processing and maintenance
tasks for the MDB Mapper project.

## Directory Structure

- **JavaScript scripts** - Run directly with Node.js from the project root
- **Python scripts** - Self-contained Python environment managed with `uv`
- **pyproject.toml** - Python project configuration and dependencies
- **README.md** - This file

## JavaScript Scripts

### Prerequisites

- Node.js (version specified in root `mise.toml`)
- Dependencies installed via `npm install` in the project root

### Running JavaScript Scripts

```bash
# From project root
node scripts/upload-tiles.js

# Or from scripts directory
cd scripts
node upload-tiles.js
```

### Available JavaScript Scripts

- `upload-tiles.js` - Uploads map tiles to S3 storage

## Python Scripts

### Prerequisites

- [uv](https://github.com/astral-sh/uv) installed
- Python 3.13+ (managed automatically by uv)

### Setup

```bash
# From scripts directory
cd scripts
uv pip install -e ".[dev]"  # Installs mdb_mapper CLI tool
```

### Running Python Scripts

```bash
# From scripts directory
cd scripts
uv run python script_name.py

# Example: Run the demo script
uv run python example_script.py

# Or with additional inline dependencies
uv run --with pandas python data_processor.py
```

### Available Python Scripts

- `example_script.py` - Demonstrates uv dependency management with the `rich`
  library
- `mdb_mapper` - CLI tool for image preprocessing and tiling (installed as command)

#### MDB Mapper CLI

```bash
# Preprocess raw images with metadata
uv run mdb_mapper preprocess <raw_data_dir> <metadata.geojson>

# Process preprocessed images into tiles  
uv run mdb_mapper process <preprocessed_data_dir> [output_dir]

# Run tests
uv run pytest tests/
```

### Adding Python Dependencies

```bash
cd scripts
# Add to project dependencies
uv add numpy pandas

# Or use inline for one-off scripts
uv run --with requests python fetch_data.py
```

## Development Guidelines

### JavaScript

- Use ES6 modules (type: "module" is set in package.json)
- Follow the project's ESLint configuration
- Prefer functional programming patterns

### Python

- Keep scripts focused on data processing and preprocessing
- Use type hints where appropriate
- Follow PEP 8 style guidelines
- Document script purpose and usage in docstrings
- All Python dependencies are managed within this directory's `pyproject.toml`
- The Python environment is completely self-contained (no files at project root)

## Examples

### Creating a New JavaScript Script

```javascript
// scripts/process-data.js
import fs from "fs/promises";

const processData = async () => {
  // Your processing logic here
};

processData().catch(console.error);
```

### Creating a New Python Script

```python
# scripts/analyze_tiles.py
"""Analyze tile data for the MDB Mapper project."""

import argparse
from pathlib import Path


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('input', type=Path, help='Input data path')
    args = parser.parse_args()

    # Your processing logic here


if __name__ == '__main__':
    main()
```

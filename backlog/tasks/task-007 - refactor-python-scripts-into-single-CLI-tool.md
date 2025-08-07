---
id: task-007
title: refactor python scripts into single CLI tool
status: Done
assignee: []
created_date: "2025-08-07 01:58"
updated_date: "2025-08-07 02:10"
labels: []
dependencies: []
---

## Description

We need to refactor the scripts in @scripts/ directory into a single CLI tool
(using the @scripts/pyproject.toml project file) that:

- is called `mdb_mapper`
- provides a CLI interface with `typer`
- has the following commands
  - `preprocess` which takes `raw_data_dir` (path) and `metadata` (geojson file)
    arguments and preprocesses all the image files in `raw_data_dir` into an
    `preprocessed_data_dir` (path, default "preprocessed_data/")
  - `process` which takes `preprocessed_data_dir` (path) and `image_tile_dir`
    (path) arguments and processes all the preprocessed image files in
    `preprocessed_data_dir` into an `image_tile_dir` (path, default
    "image_tiles/")
- includes a simple pytest suite (mostly empty for now)

Keep the code simple and readable. The existing @scripts/image-geolocation.py`
has some functionality which is part of the preprocess step, but for the
purposes of this task the actual commands should be stubbed out - the purpose is
to set the project and modules up in a sensible, modern and pythonic way.

## Implementation Notes

Completed the refactoring with the following structure:

- Created `pyproject.toml` with project configuration for `mdb_mapper` package
- Set up package structure at `scripts/mdb_mapper/` with `__init__.py`
- Implemented CLI using `typer` with two commands:
  - `preprocess`: Takes raw_data_dir and metadata (geojson) arguments
  - `process`: Takes preprocessed_data_dir argument
- Both commands are stubbed but have proper argument handling and error checking
- Added comprehensive pytest test suite in `scripts/tests/`
- All tests pass (9 tests total)
- Package installed successfully with `uv pip install -e ".[dev]"`
- CLI commands work as expected with proper help and error messages

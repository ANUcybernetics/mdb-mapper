---
id: task-007
title: refactor python scripts into single CLI tool
status: To Do
assignee: []
created_date: "2025-08-07 01:58"
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

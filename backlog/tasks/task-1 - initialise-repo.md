---
id: task-1
title: initialise repo
status: Done
assignee: []
created_date: '2025-08-03 22:26'
updated_date: '2025-08-03 23:57'
labels: []
dependencies: []
---

## Description

This project is currently empty and needs to be initialised. It should be:

1. an eleventy (11ty) static site
2. which has a landing page that uses leaflet.js to display a map of (S3-hosted)
   tiles of sattelite imagery
3. metadata (hosted in this project) telling leaflet.js about the tiles
   (according to the usual geojson or other standard format expected by
   leaflet.js)
4. scripts (to be run manually) for uploading the image tiles to the S3 bucket
   (this can be stubbed out for now, because I don't have the image files yet)
   and updating the metadata in this project
5. a small, simple test suite (using a lightweight testing library)
6. an about page which lists some basic information about the project

Use the latest versions (from npm) of all libraries, and all local tools through
their mise-provided executables (should also be latest versions).

The one key feature required from the leaflet.js map is the ability for the
viewer to navigate through time (each location will have several image tiles,
with associated "time of capture" metadata). This could just be through an
on-screen "time slider" element, but the ability to do it with a gesture (e.g.
two-finger scroll) as well would be even better.

## Progress Notes

### Completed:
1. ✅ Initialized npm project with latest Eleventy (v3.1.2)
2. ✅ Created Eleventy static site structure with proper configuration
3. ✅ Implemented landing page with Leaflet.js map integration
4. ✅ Added time navigation controls:
   - Time slider at bottom of map
   - Ctrl/Cmd + scroll wheel for gesture-based navigation
   - Smooth transitions between time periods
5. ✅ Created metadata structure (tile-metadata.json) in GeoJSON-compatible format
6. ✅ Created S3 upload scripts (stubbed implementation in scripts/upload-tiles.js)
7. ✅ Created about page with project information
8. ✅ Set up test suite using Vitest (lightweight testing library)
   - Metadata validation tests
   - Eleventy build tests
   - All tests passing

### Implementation Details:
- Map centered on Murray Darling Basin coordinates (-33.0, 143.0)
- Time slider shows formatted dates for each imagery capture
- Metadata supports multiple time series entries with S3 tile URLs
- Upload script provides structure for future S3 integration
- Clean, responsive design with navigation header
- Tests verify metadata structure, build process, and asset generation

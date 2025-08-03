---
layout: about.njk
title: About
---

# About Murray Darling Basin Mapper

The Murray Darling Basin Mapper is an interactive web application that provides satellite imagery of Australia's Murray Darling Basin region across different time periods. This tool allows researchers, environmentalists, and the general public to visualize changes in the landscape over time.

## Features

- Interactive map powered by Leaflet.js
- Time-series satellite imagery navigation
- Smooth transitions between different time periods
- Gesture-based time navigation (Ctrl/Cmd + scroll)
- High-resolution tile-based imagery

## Data Sources

The satellite imagery displayed in this application is stored on Amazon S3 and includes multiple captures across different seasons and years. The metadata system allows for easy updates as new imagery becomes available.

## Technical Details

This application is built using:

- Eleventy (11ty) - Static site generator
- Leaflet.js - Interactive mapping library
- Amazon S3 - Tile storage
- Modern JavaScript for interactivity

## Usage

Navigate through time using the slider at the bottom of the map, or use Ctrl/Cmd + scroll wheel for quick time navigation. The map supports standard pan and zoom controls for exploring different regions of the basin.
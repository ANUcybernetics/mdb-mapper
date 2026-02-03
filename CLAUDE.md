This project is

- a web-based interactive map powered by 11ty and leaflet.js, and uses vite as
  the build tool
- a python CLI tool (in @scripts/) for pre-processing the image data for
  uploading to the web and using in the leaflet map

## Python

- use `uv` for _everything_
- use modern python: we support 3.12 and above
- use type hints

## JavaScript

- run the full test suite with `npm run test:run`
- always use modern js best practices (don't worry about older browsers or
  backward compatibility)
- prefer a functional approach (map, filter, reduce) and pure functions wherever
  possible
- don't do anything which compromises the accessibility of the finished product

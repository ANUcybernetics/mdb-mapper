# GA Photo URLs Generator

Generates direct download links for historical aerial photographs from [Geoscience Australia's Historic Imagery Collection](https://www.ga.gov.au/scientific-topics/national-location-information/historical-aerial-photography).

## Usage

Parse GeoJSON data to extract download URLs for aerial photography TIF files:

```bash
# From STDIN
cat imagery.geojson | python GA-photo-URLS.py

# From file
python GA-photo-URLS.py -f imagery.geojson
```

## Requirements

* Python 3.6+
* GeoJSON data containing `FILM_NUMBER` and `FRAME` properties

## Output

Direct download links to GA's aerial photography archive:

```
https://aerialphotography.ga.gov.au/Scanned/CAC/CAC89/CAC89_frame5002.tif
```

Use with `wget`, `curl`, or similar tools to download historical imagery.


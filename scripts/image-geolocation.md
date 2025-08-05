


# image_geolocation.py

Generates an [image geolocation file](https://docs.opendronemap.org/geo/) so that WebODM knows the approximate location of each photo. Takes a geojson of photo metadata as its input. For the geoscience 
image geolocation files

## Usage

```bash
python script.py [-e EXTENSION] geojson_file
```

**Options:**
- `-e, --extension`: File extension for image names (default: tif)

**Examples:**
```bash
python script.py photos.geojson
python script.py -e jpg aerial_photos.geojson
```

## Output Format

```
EPSG:4326
image_name    longitude    latitude    [height]
...
```

## Required GeoJSON Structure

The script expects a GeoJSON FeatureCollection with features containing:

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "FILM_NUMBER": "CAC80",
        "FRAME": "5107",
        "AVE_HEIGHT": "2548 m"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [longitude, latitude]
      }
    }
  ]
}
```

**Required attributes:**
- `FILM_NUMBER`: Used for image filename
- `FRAME`: Used for image filename  
- `AVE_HEIGHT`: Altitude in metres (optional)
- `coordinates`: [longitude, latitude] array





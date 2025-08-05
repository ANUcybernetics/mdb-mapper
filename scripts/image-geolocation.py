#!/usr/bin/env python3
import json
import sys
import argparse

def main():
    parser = argparse.ArgumentParser(description='Extract photo positions from GeoJSON file')
    parser.add_argument('geojson_file', help='Path to the GeoJSON file')
    parser.add_argument('-e', '--extension', default='tif', help='File extension for image names (default: tif)')
    
    args = parser.parse_args()
    
    try:
        with open(args.geojson_file, 'r') as f:
            data = json.load(f)
        
        # Print projection (assuming WGS84 based on CRS84 in your file)
        print("EPSG:4326")
        
        # Extract data for each feature
        for feature in data['features']:
            props = feature['properties']
            coords = feature['geometry']['coordinates']
            
            # Create image name from film number and frame
            film_num = props.get('FILM_NUMBER', '')
            frame = props.get('FRAME', '')
            image_name = f"{film_num}_frame{frame}.{args.extension}"
            
            # Get coordinates
            lon = coords[0]
            lat = coords[1]
            
            # Get height if available
            height = props.get('AVE_HEIGHT', '').replace(' m', '') if props.get('AVE_HEIGHT') else ''
            
            # Format output
            if height:
                print(f"{image_name}\t{lon}\t{lat}\t{height}")
            else:
                print(f"{image_name}\t{lon}\t{lat}")
    
    except FileNotFoundError:
        print(f"Error: File '{args.geojson_file}' not found", file=sys.stderr)
        sys.exit(1)
    except json.JSONDecodeError:
        print("Error: Invalid JSON file", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()

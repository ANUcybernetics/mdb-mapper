import json
import argparse
import sys

def generate_download_links(geojson_data):
    """
    Parses GeoJSON data and generates download links for aerial photographs.

    Args:
        geojson_data (str): A string containing the GeoJSON data.

    Returns:
        list: A list of generated download URLs.
    """
    try:
        data = json.loads(geojson_data)
    except json.JSONDecodeError:
        print("Error: Invalid GeoJSON data.", file=sys.stderr)
        return []

    download_links = []
    base_url = "https://aerialphotography.ga.gov.au/Scanned/CAC"

    if "features" in data and isinstance(data["features"], list):
        for feature in data["features"]:
            if "properties" in feature:
                properties = feature["properties"]
                film_number = properties.get("FILM_NUMBER")
                frame = properties.get("FRAME")

                if film_number and frame:
                    # Construct the URL based on the example provided
                    # e.g., https://aerialphotography.ga.gov.au/Scanned/CAC/CAC89/CAC89_frame5002.tif
                    link = f"{base_url}/{film_number}/{film_number}_frame{frame}.tif"
                    download_links.append(link)
                else:
                    print(f"Warning: Missing 'FILM_NUMBER' or 'FRAME' in feature: {properties}", file=sys.stderr)
    else:
        print("Error: GeoJSON data does not contain a 'features' array.", file=sys.stderr)
        return []

    return download_links

def main():
    parser = argparse.ArgumentParser(
        description="Generate download links for aerial photographs from GeoJSON data",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Read from STDIN
  cat data.geojson | python %(prog)s
  
  # Read from file
  python %(prog)s -f data.geojson
  python %(prog)s --file data.geojson
        """
    )
    
    parser.add_argument(
        '-f', '--file',
        type=str,
        help='Path to GeoJSON file to read from'
    )
    
    args = parser.parse_args()
    
    # Determine input source
    if args.file:
        # Read from file
        try:
            with open(args.file, 'r', encoding='utf-8') as f:
                geojson_content = f.read()
        except FileNotFoundError:
            print(f"Error: File '{args.file}' not found.", file=sys.stderr)
            sys.exit(1)
        except IOError as e:
            print(f"Error reading file '{args.file}': {e}", file=sys.stderr)
            sys.exit(1)
    else:
        # Read from STDIN
        if sys.stdin.isatty():
            print("Error: No input provided. Use -f to specify a file or pipe data to STDIN.", file=sys.stderr)
            parser.print_help()
            sys.exit(1)
        
        try:
            geojson_content = sys.stdin.read()
        except KeyboardInterrupt:
            print("\nOperation cancelled.", file=sys.stderr)
            sys.exit(1)
    
    # Process the GeoJSON data
    if not geojson_content.strip():
        print("Error: No data provided or file is empty.", file=sys.stderr)
        sys.exit(1)
    
    links = generate_download_links(geojson_content)
    
    if links:
        print("Generated Download Links:")
        for link in links:
            print(link)
    else:
        print("No download links could be generated.", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()

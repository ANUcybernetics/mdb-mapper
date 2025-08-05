#!/usr/bin/env python3
import os
import argparse
from PIL import Image, ImageFile

# To Do:
# This script should be an image pre-processor. It should be able to trim, crop,
# downscale and compress depending on the options specified.

# Disable decompression bomb protection
Image.MAX_IMAGE_PIXELS = None
ImageFile.LOAD_TRUNCATED_IMAGES = True

def main():
    parser = argparse.ArgumentParser(description='Crop borders from images')
    parser.add_argument('files', nargs='+', help='Input image files')
    parser.add_argument('-o', '--output', required=True, help='Output directory')
    parser.add_argument('-c', '--crop', type=int, default=1000, 
                       help='Pixels to crop from each edge (default: 1000)')
    parser.add_argument('-q', '--quality', type=int, default=95,
                       help='JPEG quality for output (default: 95)')
    
    args = parser.parse_args()
    
    # Create output directory
    os.makedirs(args.output, exist_ok=True)
    
    for filepath in args.files:
        try:
            print(f"Processing {filepath}...")
            img = Image.open(filepath)
            width, height = img.size
            print(f"  Original size: {width}x{height}")
            
            # Check if crop values are valid
            if width <= 2 * args.crop or height <= 2 * args.crop:
                print(f"  Skipping {filepath} - too small to crop by {args.crop} pixels")
                continue
            
            # Crop: left, top, right, bottom
            cropped = img.crop((args.crop, args.crop, 
                               width - args.crop, height - args.crop))
            
            new_width, new_height = cropped.size
            print(f"  Cropped size: {new_width}x{new_height}")
            
            # Get just the filename for output
            filename = os.path.basename(filepath)
            output_path = os.path.join(args.output, filename)
            
            # Save with specified quality
            cropped.save(output_path, quality=args.quality, optimize=True)
            print(f"  Saved: {output_path}")
            
            # Close images to free memory
            img.close()
            cropped.close()
            
        except Exception as e:
            print(f"Error processing {filepath}: {e}")

    print("Done!")

if __name__ == "__main__":
    main()

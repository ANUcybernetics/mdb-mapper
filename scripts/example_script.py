#!/usr/bin/env python3
"""Example script demonstrating uv dependency management with external packages."""

from rich.console import Console
from rich.table import Table
from rich.progress import track
import time


def main():
    """Demonstrate using external dependencies managed by uv."""
    console = Console()
    
    # Create a fancy table
    table = Table(title="MDB Mapper Script Status")
    table.add_column("Script", style="cyan", no_wrap=True)
    table.add_column("Status", style="magenta")
    table.add_column("Description", style="green")
    
    table.add_row("upload-tiles.js", "✓ Available", "Upload map tiles to S3")
    table.add_row("example_script.py", "⚡ Running", "Demo of uv package management")
    
    console.print(table)
    
    # Show a progress bar
    console.print("\n[bold blue]Processing example data...[/bold blue]")
    for _ in track(range(10), description="Processing..."):
        time.sleep(0.1)
    
    console.print("[bold green]✨ Done![/bold green]")


if __name__ == "__main__":
    main()
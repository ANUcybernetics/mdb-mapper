"""MDB Mapper CLI interface."""

from pathlib import Path
from typing import Optional

import typer
from rich.console import Console

app = typer.Typer(
    name="mdb_mapper",
    help="CLI tool for processing MDB mapper images",
    add_completion=False,
)
console = Console()


@app.command()
def preprocess(
    raw_data_dir: Path = typer.Argument(..., help="Path to raw data directory"),
    metadata: Path = typer.Argument(..., help="Path to GeoJSON metadata file"),
    preprocessed_data_dir: Path = typer.Option(
        Path("preprocessed_data/"),
        "--output", "-o",
        help="Output directory for preprocessed data"
    ),
):
    """Preprocess image files from raw data directory."""
    console.print(f"[bold green]Preprocessing images...[/bold green]")
    console.print(f"  Raw data directory: {raw_data_dir}")
    console.print(f"  Metadata file: {metadata}")
    console.print(f"  Output directory: {preprocessed_data_dir}")
    
    if not raw_data_dir.exists():
        console.print(f"[bold red]Error:[/bold red] Raw data directory '{raw_data_dir}' does not exist")
        raise typer.Exit(code=1)
    
    if not metadata.exists():
        console.print(f"[bold red]Error:[/bold red] Metadata file '{metadata}' does not exist")
        raise typer.Exit(code=1)
    
    preprocessed_data_dir.mkdir(parents=True, exist_ok=True)
    
    console.print("[dim]Note: This is a stub implementation[/dim]")
    console.print("[bold green]✓ Preprocessing complete![/bold green]")


@app.command()
def process(
    preprocessed_data_dir: Path = typer.Argument(
        ..., help="Path to preprocessed data directory"
    ),
    image_tile_dir: Path = typer.Argument(
        Path("image_tiles/"),
        help="Output directory for image tiles"
    ),
):
    """Process preprocessed image files into tiles."""
    console.print(f"[bold green]Processing image tiles...[/bold green]")
    console.print(f"  Preprocessed data directory: {preprocessed_data_dir}")
    console.print(f"  Image tile directory: {image_tile_dir}")
    
    if not preprocessed_data_dir.exists():
        console.print(f"[bold red]Error:[/bold red] Preprocessed data directory '{preprocessed_data_dir}' does not exist")
        raise typer.Exit(code=1)
    
    image_tile_dir.mkdir(parents=True, exist_ok=True)
    
    console.print("[dim]Note: This is a stub implementation[/dim]")
    console.print("[bold green]✓ Processing complete![/bold green]")


if __name__ == "__main__":
    app()
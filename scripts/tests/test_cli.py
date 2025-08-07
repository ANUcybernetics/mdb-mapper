"""Tests for the CLI interface."""

from pathlib import Path
from typer.testing import CliRunner
from mdb_mapper.cli import app

runner = CliRunner()


def test_preprocess_command_help():
    """Test that preprocess command shows help."""
    result = runner.invoke(app, ["preprocess", "--help"])
    assert result.exit_code == 0
    assert "Preprocess image files" in result.stdout


def test_process_command_help():
    """Test that process command shows help."""
    result = runner.invoke(app, ["process", "--help"])
    assert result.exit_code == 0
    assert "Process preprocessed image files" in result.stdout


def test_preprocess_missing_args():
    """Test that preprocess command requires arguments."""
    result = runner.invoke(app, ["preprocess"])
    assert result.exit_code != 0


def test_process_missing_args():
    """Test that process command requires arguments."""
    result = runner.invoke(app, ["process"])
    assert result.exit_code != 0


def test_preprocess_with_nonexistent_dir(tmp_path):
    """Test preprocess command with non-existent directory."""
    metadata_file = tmp_path / "metadata.geojson"
    metadata_file.write_text('{"type": "FeatureCollection", "features": []}')
    
    result = runner.invoke(app, [
        "preprocess",
        str(tmp_path / "nonexistent"),
        str(metadata_file)
    ])
    assert result.exit_code == 1
    assert "does not exist" in result.stdout


def test_preprocess_with_nonexistent_metadata(tmp_path):
    """Test preprocess command with non-existent metadata file."""
    raw_dir = tmp_path / "raw"
    raw_dir.mkdir()
    
    result = runner.invoke(app, [
        "preprocess",
        str(raw_dir),
        str(tmp_path / "nonexistent.geojson")
    ])
    assert result.exit_code == 1
    assert "does not exist" in result.stdout


def test_process_with_nonexistent_dir(tmp_path):
    """Test process command with non-existent directory."""
    result = runner.invoke(app, [
        "process",
        str(tmp_path / "nonexistent")
    ])
    assert result.exit_code == 1
    assert "does not exist" in result.stdout


def test_preprocess_success(tmp_path):
    """Test successful preprocess command execution."""
    raw_dir = tmp_path / "raw"
    raw_dir.mkdir()
    metadata_file = tmp_path / "metadata.geojson"
    metadata_file.write_text('{"type": "FeatureCollection", "features": []}')
    
    result = runner.invoke(app, [
        "preprocess",
        str(raw_dir),
        str(metadata_file)
    ])
    assert result.exit_code == 0
    assert "Preprocessing complete" in result.stdout


def test_process_success(tmp_path):
    """Test successful process command execution."""
    preprocessed_dir = tmp_path / "preprocessed"
    preprocessed_dir.mkdir()
    
    result = runner.invoke(app, [
        "process",
        str(preprocessed_dir)
    ])
    assert result.exit_code == 0
    assert "Processing complete" in result.stdout
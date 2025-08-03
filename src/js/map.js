// Map initialization
const map = L.map('map').setView([-33.0, 143.0], 6); // Center on Murray Darling Basin

// Base map layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Time-based imagery layers storage
let imageryLayers = [];
let currentLayerIndex = 0;
let tileMetadata = null;

// Load metadata
async function loadMetadata() {
    try {
        const response = await fetch('/data/tile-metadata.json');
        tileMetadata = await response.json();
        initializeTimeSeries();
    } catch (error) {
        console.error('Failed to load metadata:', error);
        document.getElementById('current-time').textContent = 'No data available';
    }
}

// Initialize time series controls
function initializeTimeSeries() {
    if (!tileMetadata || !tileMetadata.timeSeries || tileMetadata.timeSeries.length === 0) {
        document.getElementById('current-time').textContent = 'No time series data';
        return;
    }

    const slider = document.getElementById('time-slider');
    const timeDisplay = document.getElementById('current-time');
    const startTime = document.getElementById('start-time');
    const endTime = document.getElementById('end-time');

    // Set up time range
    const times = tileMetadata.timeSeries;
    slider.max = times.length - 1;
    
    startTime.textContent = formatDate(times[0].date);
    endTime.textContent = formatDate(times[times.length - 1].date);

    // Create layers for each time point
    times.forEach((timePoint, index) => {
        const layer = L.tileLayer(timePoint.tileUrl, {
            attribution: `Imagery date: ${formatDate(timePoint.date)}`,
            maxZoom: timePoint.maxZoom || 18,
            opacity: index === 0 ? 1 : 0
        });
        
        imageryLayers.push({
            layer: layer,
            date: timePoint.date,
            metadata: timePoint
        });

        if (index === 0) {
            layer.addTo(map);
        }
    });

    // Handle slider changes
    slider.addEventListener('input', (e) => {
        const index = parseInt(e.target.value);
        showLayer(index);
    });

    // Handle mouse wheel for time navigation
    let wheelTimeout;
    map.getContainer().addEventListener('wheel', (e) => {
        if (e.ctrlKey || e.metaKey) { // Two-finger scroll on trackpad usually sends ctrl/meta
            e.preventDefault();
            
            clearTimeout(wheelTimeout);
            wheelTimeout = setTimeout(() => {
                const delta = e.deltaY > 0 ? 1 : -1;
                const newIndex = Math.max(0, Math.min(imageryLayers.length - 1, currentLayerIndex + delta));
                
                if (newIndex !== currentLayerIndex) {
                    slider.value = newIndex;
                    showLayer(newIndex);
                }
            }, 50);
        }
    });

    // Initialize display
    showLayer(0);
}

// Show specific time layer
function showLayer(index) {
    if (index < 0 || index >= imageryLayers.length) return;

    // Hide current layer
    if (imageryLayers[currentLayerIndex]) {
        imageryLayers[currentLayerIndex].layer.setOpacity(0);
    }

    // Show new layer
    currentLayerIndex = index;
    const currentData = imageryLayers[index];
    
    if (!map.hasLayer(currentData.layer)) {
        currentData.layer.addTo(map);
    }
    currentData.layer.setOpacity(1);

    // Update time display
    document.getElementById('current-time').textContent = formatDate(currentData.date);
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-AU', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', loadMetadata);
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../css/main.css';

class MurrayDarlingMap {
  constructor() {
    this.map = null;
    this.imageryLayers = [];
    this.currentLayerIndex = 0;
    this.tileMetadata = null;
    this.elements = {};
  }

  init() {
    this.initializeMap();
    this.cacheElements();
    this.loadMetadata();
  }

  initializeMap() {
    this.map = L.map('map').setView([-33.0, 143.0], 6);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  cacheElements() {
    this.elements = {
      slider: document.getElementById('time-slider'),
      timeDisplay: document.getElementById('current-time'),
      startTime: document.getElementById('start-time'),
      endTime: document.getElementById('end-time')
    };
  }

  async loadMetadata() {
    try {
      const response = await fetch('/data/tile-metadata.json');
      this.tileMetadata = await response.json();
      this.initializeTimeSeries();
    } catch (error) {
      console.error('Failed to load metadata:', error);
      this.elements.timeDisplay.textContent = 'No data available';
    }
  }

  initializeTimeSeries() {
    if (!this.tileMetadata?.timeSeries?.length) {
      this.elements.timeDisplay.textContent = 'No time series data';
      return;
    }

    const times = this.tileMetadata.timeSeries;
    this.setupTimeRange(times);
    this.createImageryLayers(times);
    this.setupEventListeners();
    this.showLayer(0);
  }

  setupTimeRange(times) {
    this.elements.slider.max = times.length - 1;
    this.elements.startTime.textContent = this.formatDate(times[0].date);
    this.elements.endTime.textContent = this.formatDate(times[times.length - 1].date);
  }

  createImageryLayers(times) {
    this.imageryLayers = times.map((timePoint, index) => {
      const layer = L.tileLayer(timePoint.tileUrl, {
        attribution: `Imagery date: ${this.formatDate(timePoint.date)}`,
        maxZoom: timePoint.maxZoom || 18,
        opacity: 0
      });

      if (index === 0) {
        layer.addTo(this.map);
        layer.setOpacity(1);
      }

      return {
        layer,
        date: timePoint.date,
        metadata: timePoint
      };
    });
  }

  setupEventListeners() {
    this.elements.slider.addEventListener('input', (e) => {
      const index = parseInt(e.target.value);
      this.showLayer(index);
    });

    this.setupWheelNavigation();
  }

  setupWheelNavigation() {
    const wheelTimeoutRef = { current: null };
    
    this.map.getContainer().addEventListener('wheel', (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        
        clearTimeout(wheelTimeoutRef.current);
        wheelTimeoutRef.current = setTimeout(() => {
          const delta = e.deltaY > 0 ? 1 : -1;
          const newIndex = Math.max(0, Math.min(this.imageryLayers.length - 1, this.currentLayerIndex + delta));
          
          if (newIndex !== this.currentLayerIndex) {
            this.elements.slider.value = newIndex;
            this.showLayer(newIndex);
          }
        }, 50);
      }
    });
  }

  showLayer(index) {
    if (index < 0 || index >= this.imageryLayers.length) {return;}

    if (this.imageryLayers[this.currentLayerIndex]) {
      this.imageryLayers[this.currentLayerIndex].layer.setOpacity(0);
    }

    this.currentLayerIndex = index;
    const currentData = this.imageryLayers[index];
    
    if (!this.map.hasLayer(currentData.layer)) {
      currentData.layer.addTo(this.map);
    }
    currentData.layer.setOpacity(1);

    this.elements.timeDisplay.textContent = this.formatDate(currentData.date);
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-AU', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const map = new MurrayDarlingMap();
    map.init();
  });
} else {
  const map = new MurrayDarlingMap();
  map.init();
}
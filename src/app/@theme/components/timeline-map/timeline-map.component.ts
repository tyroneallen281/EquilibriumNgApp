import { Component, OnInit, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
declare let L;
import 'style-loader!leaflet/dist/leaflet.css';
import '../../../../../node_modules/leaflet-play/dist/LeafletPlayback.js'
import { Observable } from 'rxjs';

@Component({
  selector: 'ngx-timeline-map-element',
  templateUrl: './timeline-map.component.html',
  styleUrls: ['./timeline-map.component.scss']
})
export class TimeLineMapComponent implements OnInit {
  @Input() tracks: any;
  @Input() control: { resizeMap };
  public map;
  public mapLatLng = L.latLng({ lat: 0, lng: 0});
  public playback;
  markers = [];
  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }),
    ],
    zoom: 14,
    center: this.mapLatLng,
  };


  constructor() {

  }

  ngOnInit() {
  
  }
  ngOnChanges(changes: SimpleChanges) {
    
    if (this.map != null) {
      this.map.invalidateSize(false);
      
    }
    if (this.tracks != null && this.tracks.length > 0) {
      this.addPlaybackControl();
    }
  }
  onMapReady(map: L.Map) {
    setTimeout(() => {
      this.map = map;
      this.control.resizeMap = this.resizeMap;
    }, 0);
  }

  resizeMap() {
    window.dispatchEvent(new Event('resize'));
  }

  public polyline_options = {
    color: '#000'
  };

  
 
// Playback options
public playbackOptions = {
  playControl: true,
  dateControl: true,
  sliderControl: true,
  speed: 10000000000,
  tickLen: 10000,
  // layer and marker options
  layer: {
    pointToLayer: function (featureData, latlng) {
      var result : any;

      if (featureData && featureData.properties && featureData.properties.path_options) {
        result = featureData.properties.path_options;
      }
       return new L.CircleMarker(latlng, result);
    }
  },

  marker: function () {
    return { icon: L.icon({
      iconSize: [48, 48],
      iconAnchor: [24, 48],
      iconUrl: 'https://img.icons8.com/color/48/000000/marker.png',
    shadowUrl: ''
    })
    };
  }
};


  addPlaybackControl() {

    // Initialize playback
    this.playback = new L.Playback(this.map, this.tracks, null, this.playbackOptions);
    this.playback.setSpeed(10000000000);
    if (this.tracks != null && this.tracks.length > 0) {
      this.playback.setCursor(this.tracks[0].properties.time[this.tracks[0].properties.time.length - 1]);
      console.log(this.tracks[0].geometry.coordinates[this.tracks[0].geometry.coordinates.length - 1][1]);
      this.map.setView(new L.LatLng(this.tracks[0].geometry.coordinates[this.tracks[0].geometry.coordinates.length - 1][1], this.tracks[0].geometry.coordinates[this.tracks[0].geometry.coordinates.length - 1][0]), 15);
    }

  }
}

import { Component, OnInit, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import 'style-loader!leaflet/dist/leaflet.css';

@Component({
  selector: 'ngx-heat-map-element',
  templateUrl: './heat-map.component.html',
  styleUrls: ['./heat-map.component.scss']
})
export class HeatMapComponent implements OnInit {

  public mapLatLng = L.latLng({ lat: 0, lng: 0});

  markers = [];
  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }),
    ],
    zoom: 14,
    center: this.mapLatLng,
  };
  public testData = {
  max: 8,
  data: [{ lat: 24.6408, lng: 46.7728, count: 1 }, { lat: 50.75, lng: -1.55, count: 1 }]
};
 public cfg = {
  // radius should be small ONLY if scaleRadius is true (or small radius is intended)
  // if scaleRadius is false it will be the constant radius used in pixels
  "radius": 2,
  "maxOpacity": .8,
  // scales the radius based on map zoom
  "scaleRadius": true,
  // if set to false the heatmap uses the global maximum for colorization
  // if activated: uses the data maximum within the current map boundaries 
  //   (there will always be a red spot with useLocalExtremas true)
  "useLocalExtrema": true,
  // which field name in your data represents the latitude - default "lat"
  latField: 'lat',
  // which field name in your data represents the longitude - default "lng"
  lngField: 'lng',
  // which field name in your data represents the data value - default "value"
  valueField: 'count'
};
  constructor() {

  }

  ngOnInit() {
  
  }
  ngOnChanges(changes: SimpleChanges) {
   
  }
  onMapReady(map: L.Map) {
   setTimeout(() => {
      map.invalidateSize();
    }, 10);
  }


}

import { Component, OnInit, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
declare let L;
import 'style-loader!leaflet/dist/leaflet.css';
import '../../../../../node_modules/leaflet-draw/dist/leaflet.draw.js'
import '../../../../../node_modules/leaflet-draw/dist/leaflet.draw.css'
import { Observable } from 'rxjs';

@Component({
  selector: 'ngx-draw-map-element',
  templateUrl: './draw-map.component.html',
  styleUrls: ['./draw-map.component.scss']
})
export class DrawMapComponent implements OnInit {
  @Input() geoJson: string;
  public map;
  public mapLatLng = L.latLng({ lat: -26.11308, lng: 27.848520 });
  @Output() mapDrawEnd = new EventEmitter();
  public editableLayers = new L.FeatureGroup();
  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }),
    ],
    zoom: 14,
    center: this.mapLatLng,
  };
  // define toolbar options
  drawOptions = {
    position: 'topright',
    draw: {
      polyline: false,
      polygon: true,
      circle: true,
      rectangle: true,
      circlemarker: false,
      marker: false,
    },
    edit: {
      featureGroup: this.editableLayers, //REQUIRED!!
      remove: true
    }
  };
  fenceStyle = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
  };


  constructor() {

  }

  ngOnInit() {

  }
  ngOnChanges(changes: SimpleChanges) {

  }
  onMapReady(map: L.Map) {
    setTimeout(() => {
      this.map = map;
   
      this.editableLayers = new L.FeatureGroup().addTo(this.map);
      
      var geoJsonObject = JSON.parse(this.geoJson);
      geoJsonObject.features[0].properties = {};
      var geoDataLayer = L.geoJSON(geoJsonObject).addTo(this.editableLayers);
      this.mapDrawEnd.emit(this.editableLayers.toGeoJSON());
      this.editableLayers = new L.FeatureGroup(geoDataLayer).addTo(this.map);
      this.map.addLayer(this.editableLayers);
    }, 0);
  }
  addNonGroupLayers(sourceLayer, targetGroup) {
    var self = this;
    if (sourceLayer instanceof L.LayerGroup) {
      sourceLayer.eachLayer(function (layer) {
        self.addNonGroupLayers(layer, targetGroup);
      });
    } else {
      targetGroup.addLayer(sourceLayer);
    }
  }

  OnDrawCreated(e) {
    var type = e.layerType,
      layer = e.layer;

    if (this.editableLayers == null) {
      return;
    }
    this.editableLayers.addLayer(layer);
    this.mapDrawEnd.emit(this.editableLayers.toGeoJSON());
    console.log(this.editableLayers.toGeoJSON());
  }
}

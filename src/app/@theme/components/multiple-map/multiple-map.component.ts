import { Component, OnInit, EventEmitter, Input, Output, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import 'style-loader!leaflet/dist/leaflet.css';
import { MapLocationModel } from '../../../@core/classes/MapItemModel';

@Component({
  selector: 'ngx-multiple-map-element',
  templateUrl: './multiple-map.component.html',
  styleUrls: ['./multiple-map.component.scss']
})
export class MultipleMapComponent implements OnInit, OnChanges {
  @Input() mapList: any;
  @Output() refreshMapData = new EventEmitter();
  public mapLatLng = L.latLng({ lat: -26.18, lng: 28.05 });
  public zoom: number = 13;
  public map: L.Map;
  markers = [];
  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 16 , minZoom: 6 }),
    ],
    zoom: this.zoom,
    center: this.mapLatLng,
  };

  constructor() {

  }

  ngOnInit() {

  }
  ngOnChanges(changes: SimpleChanges) {
   this.addMarkers();
  }
  onMapReady(map: L.Map) {
    console.log("test3");
    this.map = map;
    setTimeout(() => {
      map.invalidateSize(true);
    }, 100);
  }
  refreshMap(): void {
    var mapData = new MapLocationModel();
    mapData.zoom = this.zoom;
    mapData.latitude = this.mapLatLng.lat;
    mapData.longitude = this.mapLatLng.lng;
    this.refreshMapData.emit(mapData);
  }
  handleMapZoomEnd(map: L.Map): void {
     this.refreshMap();
  }

  handleMapMoveEnd(map: L.Map): void {
    this.refreshMap();
  }
  removeMarkers() {
    this.markers = [];
  }
  addMarkers() {
    var self = this;
    this.removeMarkers();
    if (this.mapList != null && this.mapList.length > 0) {
      this.mapList.forEach(function (mapItem) {
        var newMarker = L.marker(
          [mapItem.latitude, mapItem.longitude],
          {
            icon: L.icon({
              iconSize: [24, 24],
              iconAnchor: [12, 24],
              iconUrl: 'https://img.icons8.com/color/48/000000/marker.png',
              shadowUrl: ''
            })
          }
        ).bindPopup(mapItem.title);
        self.markers.push(newMarker);
      });
    }
    setTimeout(() => {
      self.map.invalidateSize(true);
    }, 1000);
  }

  
}

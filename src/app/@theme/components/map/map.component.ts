import { Component, OnInit, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import 'style-loader!leaflet/dist/leaflet.css';
import { MapService } from '@angular-baobab/rx-client-api';
import CustomStore from "devextreme/data/custom_store";

@Component({
  selector: 'ngx-map-element',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() markerSelectEnabled: boolean;
  @Input() searchEnabled: boolean;
  @Input() lat: number;
  @Input() lng: number;
  @Output() mapClickLng = new EventEmitter();
  @Output() mapClickLat = new EventEmitter();
  public mapLatLng = L.latLng({ lat: 0, lng: 0});
   dataSource = {};
  markers = [];
  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }),
    ],
    zoom: 14,
    center: this.mapLatLng,
  };
 
    constructor(private mapService: MapService) {

  }

  ngOnInit() {
      this.searchAddress();
    }

    ngOnChanges(changes: SimpleChanges) {
        this.addMarker();
    }

    searchAddress() {
        this.dataSource = {
            store: new CustomStore({
                key: "displayName",
                load: (loadOptions) => {
                    console.log(loadOptions);
                    return this.mapService.mapGetGeoCodeResults(loadOptions.searchValue)
                        .toPromise()
                        .then(result => {
                            console.log(result);
                            return {
                                data: result || [],
                                totalCount: result.length
                            }
                        });
                }
            }),
            sort: "displayName"
        }
    }

    updateMapPin(e) {
        console.log(e);
        this.lat = e.value.latitude;
        this.lng = e.value.longitude;
        this.addMarker();
    }

  onMapReady(map: L.Map) {
  
    setTimeout(() => {
      map.invalidateSize(true);
        if (this.markerSelectEnabled) {
            console.log("Click");
            map.on('click', <LeafletMouseEvent>(e) => {
              this.lat = e.latlng.lat;
              this.lng = e.latlng.lng;
              this.addMarker();
              console.log("Click", e.latlng.lng);
            });
      }
      this.addMarker();
    }, 0);
  }

    addMarker() {
       
        if (!this.lat || !this.lng) {
          return;
        }
        
        this.mapClickLat.emit(this.lat);
        this.mapClickLng.emit(this.lng);
   
        const newMarker = L.marker(
          [this.lat, this.lng],
          {
            icon: L.icon({
              iconSize: [48, 48],
              iconAnchor: [24, 48],
              iconUrl: 'https://img.icons8.com/color/48/000000/marker.png',
              shadowUrl: ''
            })
          }
        );

        
        this.markers = [];
        this.markers.push(newMarker);
        this.markers = this.markers.slice();
        this.mapLatLng = L.latLng({ lat: this.lat, lng: this.lng });
        console.log("map", this.lat, this.lng, this.markers, this.mapLatLng);

    }
  
}

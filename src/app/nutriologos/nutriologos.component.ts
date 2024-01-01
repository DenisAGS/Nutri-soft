import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

declare var google: any;

@Component({
  selector: 'app-nutriologos',
  templateUrl: './nutriologos.component.html',
  styleUrls: ['./nutriologos.component.css']
})
export class NutriologosComponent {
  map: any;

  constructor() { }

  ngOnInit(): void {
    this.initMap();
  }

  initMap(): void {
    this.map = L.map('map', {
      center: [20.659698, -103.349609],
      zoom: 13
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 12,
      maxZoom: 10
    });

    tiles.addTo(this.map);
  }

}

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

  private initMap(): void {
    // Coordenadas iniciales (centro de ejemplo)
    const initialCoords: L.LatLngExpression = [0, 0];

    this.map = L.map('map').setView(initialCoords, 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    L.marker(initialCoords).addTo(this.map);
  }

}

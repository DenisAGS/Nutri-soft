import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

declare var google: any;

@Component({
  selector: 'app-nutriologos',
  templateUrl: './nutriologos.component.html',
  styleUrls: ['./nutriologos.component.css']
})
export class NutriologosComponent {
  

  constructor() {}


  buscarNutriologos(search: string) {
    var map = L.map('map').setView([19.432608, -99.133209], 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(map);
    var marker = L.marker([19.432608, -99.133209]).addTo(map);
    marker.bindPopup('<b>¡Hola!</b><br>Estás en Ciudad de México.').openPopup();
  }
}

import { Component, OnInit } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-nutriologos',
  templateUrl: './nutriologos.component.html',
  styleUrls: ['./nutriologos.component.css']
})
export class NutriologosComponent {
  map: any;

  constructor() { }

  /*
  ngOnInit(): void {
    this.inicializarMapa();
  }


  inicializarMapa() {
      center: { lat: 0, lng: 0 },
      zoom: 8
    };

    const opcionesMapa: google.maps.MapOptions = {
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, opcionesMapa);
  }

  buscarNutriologos() {

  }*/

}

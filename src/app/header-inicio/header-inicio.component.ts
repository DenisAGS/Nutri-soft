import { Component } from '@angular/core';

@Component({
  selector: 'app-header-inicio',
  templateUrl: './header-inicio.component.html',
  styleUrls: ['./header-inicio.component.css']
})
export class HeaderInicioComponent {
  userIsLoggedIn: boolean = false;
}

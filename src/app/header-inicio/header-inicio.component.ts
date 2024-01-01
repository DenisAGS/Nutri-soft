import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';

@Component({
  selector: 'app-header-inicio',
  templateUrl: './header-inicio.component.html',
  styleUrls: ['./header-inicio.component.css']
})
export class HeaderInicioComponent implements OnInit{
  userIsLoggedIn: boolean = false;
  usuarioActivo: any;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.verificarUsuarioActivo();
  }

  verificarUsuarioActivo(): void {
    this.apollo
      .query<{ conectado?: any}>({
        query: gql`
          query {
            conectado {
              nombresCompleto
              correo
            }
          }
        `
      })
      .subscribe(({ data }) => {
        if (data?.conectado) {
          this.usuarioActivo = data?.conectado;
          this.userIsLoggedIn = true; // Usuario conectado
        } else {
          this.userIsLoggedIn = false; // Usuario no conectado
        }
      });
  }
}

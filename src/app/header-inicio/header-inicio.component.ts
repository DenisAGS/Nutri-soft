import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  isUserModalOpen = false;

  authToken: string = '';
  tipoUsuario: string = '';

  constructor(private apollo: Apollo, private router: Router) {}

  ngOnInit(): void {
    this.authToken = localStorage.getItem('token') || '';
    this.verificarUsuarioActivo();
  }

  openUserModal(): void {
    this.isUserModalOpen = true;
  }

  closeUserModal(): void {
    this.isUserModalOpen = false;
  }

  viewProfile(): void {
    this.closeUserModal();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.userIsLoggedIn = false;
    this.usuarioActivo = null;
    this.router.navigate(['/inicio']);
    this.closeUserModal();
  }

  verificarUsuarioActivo(): void {
    if (this.authToken) {
      this.apollo
        .query<{ conectado?: any }>({
          query: gql`
            query {
              conectado {
                nombresCompleto
                correo
                tipoUsuario
              }
            }
          `,
          context: {
            headers: {
              Authorization: `JWT ${this.authToken}`
            }
          }
        })
      .subscribe(({ data }) => {
        if (data?.conectado) {
          this.usuarioActivo = data?.conectado;
          this.userIsLoggedIn = true;
          this.tipoUsuario = this.usuarioActivo.tipoUsuario;
        } else {
          this.userIsLoggedIn = false; // Usuario no conectado
        }
     });
    }
  }
}

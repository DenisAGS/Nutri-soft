import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { AuthService } from '../auth.service';

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

  constructor(private apollo: Apollo, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authToken = localStorage.getItem('token') || '';
    this.authService.verificarUsuarioActivo();
    this.authService.userIsLoggedIn.subscribe((LoggedIn: boolean) => {
      this.userIsLoggedIn = LoggedIn;
    });

    this.authService.usuarioActivo.subscribe((usuario: any) => {
      this.usuarioActivo = usuario;
      this.tipoUsuario = usuario?.tipoUsuario || '';
    });
  }

  openUserModal(): void {
    this.isUserModalOpen = !this.isUserModalOpen;
  }

  closeUserModal(): void {
    this.isUserModalOpen = false;
  }

  viewProfile(): void {
    this.closeUserModal();
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('tipoUsuario');
    this.userIsLoggedIn = false;
    this.usuarioActivo = null;
    this.router.navigate(['/inicio']);
    this.closeUserModal();
  }

  getUsuarioActivo(): boolean {
    return this.userIsLoggedIn;
  }
}

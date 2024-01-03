import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authToken = localStorage.getItem('token') || '';
  userIsLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  usuarioActivo: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  isUserModalOpen = false;

  tipoUsuario: string = ''
  idUsuario: number = 0

  constructor(private apollo: Apollo) {}

  autenticarUsuario(correo: string, password: string): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation TokenAuth($correo: String!, $password: String!) {
          tokenAuth(correo: $correo, password: $password) {
            token
          }
        }
      `,
      variables: {
        correo,
        password
      }
    }).pipe(
      map((result: any) => {
        const token = result?.data?.tokenAuth?.token;
        if (token) {
          this.setAuthToken(token);
          
          return result;
        }
        throw new Error('Token de autenticación no válido');
      })
    );
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
                id
              }
            }
          `,
          context: {
            headers: {
              Authorization: `JWT ${this.authToken}`
            }
          }
        })
      .pipe(
        map(({ data }) => {
          if (data?.conectado) {
            this.usuarioActivo.next(data.conectado);
            this.userIsLoggedIn.next(true);
            this.tipoUsuario = this.usuarioActivo.value.tipoUsuario;
            this.idUsuario = this.usuarioActivo.value.id;
            localStorage.setItem('tipoUsuario', this.tipoUsuario);
            localStorage.setItem('idUsuario', this.idUsuario.toString())
          } else {
            this.userIsLoggedIn.next;
          }
       })
      ).subscribe();
    }
  }

  setAuthToken(token: string) {
    this.authToken = token;
  }

  getAuthToken(): string {
    return this.authToken;
  }

}

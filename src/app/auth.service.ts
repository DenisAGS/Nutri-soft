import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authToken: string = '';

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

  setAuthToken(token: string) {
    this.authToken = token;
  }

  getAuthToken(): string {
    return this.authToken;
  }

}

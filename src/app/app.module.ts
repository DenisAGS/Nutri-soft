import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioPublicacionesComponent } from './inicio-publicaciones/inicio-publicaciones.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { HeaderInicioComponent } from './header-inicio/header-inicio.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioPublicacionesComponent,
    IniciarSesionComponent,
    RegistroUsuarioComponent,
    HeaderInicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

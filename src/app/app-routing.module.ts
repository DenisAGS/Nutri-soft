import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderInicioComponent } from './header-inicio/header-inicio.component';
import { InicioPublicacionesComponent } from './inicio-publicaciones/inicio-publicaciones.component';

const routes: Routes = [
  {
    path:'',
    component: InicioPublicacionesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

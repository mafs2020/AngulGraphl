import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PAGES_ROUTES_MODULE } from './pages.routes';

import { DashboarComponent } from "./dashboard/dashboard.component";
import { UsuariosComponent } from './usuarios/usuarios.component';
import { NabvarComponent } from './nabvar/nabvar.component';
import { EditarComponent } from './editar/editar.component';

@NgModule({
  declarations: [
    DashboarComponent,
    UsuariosComponent,
    NabvarComponent,
    EditarComponent,
  ],
  imports: [
    CommonModule,
    PAGES_ROUTES_MODULE
  ]
})
export class PagesModule { }
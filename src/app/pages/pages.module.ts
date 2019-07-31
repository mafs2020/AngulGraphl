import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboarComponent } from "./dashboard/dashboard.component";
import { UsuariosComponent } from './usuarios/usuarios.component';

@NgModule({
  declarations: [
    DashboarComponent,
    UsuariosComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }

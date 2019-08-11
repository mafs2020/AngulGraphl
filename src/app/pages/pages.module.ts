import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PAGES_ROUTES_MODULE } from './pages.routes';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { DashboarComponent } from "./dashboard/dashboard.component";
import { UsuariosComponent } from './usuarios/usuarios.component';
import { NabvarComponent } from './nabvar/nabvar.component';
import { EditarComponent } from './editar/editar.component';
import { ModalComponent } from './modal/modal.component';
import { AddUsuarioComponent } from './add-usuario/add-usuario.component';

@NgModule({
  declarations: [
    DashboarComponent,
    UsuariosComponent,
    NabvarComponent,
    EditarComponent,
    ModalComponent,
    AddUsuarioComponent,
  ],
  imports: [
    CommonModule,
    PAGES_ROUTES_MODULE,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }

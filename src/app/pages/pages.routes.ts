import { RouterModule, Routes } from "@angular/router";
import { DashboarComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { EditarComponent } from './editar/editar.component';

const pages_routes: Routes = [
    { path: '',
    component: DashboarComponent,
    children: [
        { path: '', component: UsuariosComponent, data: { data: 'Usuario'} },
        { path: ':id', component: EditarComponent, data: { data: 'Editar'} }
    ]}
];

export const PAGES_ROUTES_MODULE = RouterModule.forChild(pages_routes);
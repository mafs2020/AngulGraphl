import { RouterModule, Routes } from "@angular/router";
import { DashboarComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const pages_routes: Routes = [
    { path: '',
    component: DashboarComponent,
    children: [
        { path: '', component: UsuariosComponent, data: { data: 'usarios'} }
    ]}
];

export const PAGES_ROUTES_MODULE = RouterModule.forChild(pages_routes);
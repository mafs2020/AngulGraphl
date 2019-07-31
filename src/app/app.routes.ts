import { RouterModule, Routes } from "@angular/router";

import { DashboarComponent } from './pages/dashboard/dashboard.component';

const App_routes: Routes = [
    { path: '', component: DashboarComponent}
];


export const APP_ROUTES_MODULE = RouterModule.forRoot(App_routes);
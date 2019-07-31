import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//modulo de paginas
import { PagesModule } from './pages/pages.module';
//rutas root
import { APP_ROUTES_MODULE } from './app.routes';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    PagesModule,
    APP_ROUTES_MODULE
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

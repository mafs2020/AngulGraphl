import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//modulo de paginas
import { PagesModule } from './pages/pages.module';
//rutas root
import { APP_ROUTES_MODULE } from './app.routes';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    PagesModule,
    APP_ROUTES_MODULE,
    GraphQLModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

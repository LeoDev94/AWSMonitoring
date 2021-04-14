import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { ProyectosComponent } from './proyectos/proyectos.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { ProyectoDetailComponent } from './proyecto-detail/proyecto-detail.component'


@NgModule({
  declarations: [
    AppComponent,
    ProyectosComponent,
    EstadisticasComponent,
    ProyectoDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

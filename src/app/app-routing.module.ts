import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProyectosComponent } from './proyectos/proyectos.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { ProyectoDetailComponent } from './proyecto-detail/proyecto-detail.component'

const routes:Routes = [
  {path: 'proyectos',component: ProyectosComponent},
  {path: 'proyectos/:proyecto:id',component:EstadisticasComponent},
  {path: 'estadisticas',component:ProyectoDetailComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

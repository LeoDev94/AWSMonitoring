import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from 'src/util/types';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  proyectosUrl = "http://localhost:3000/proyectos";
  options = {
    headers: {
      'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000'
    }
  };

  constructor(private http: HttpClient) { }

  getProyectos():Observable<Project[]>{
    return this.http.get<Project[]>(this.proyectosUrl,this.options).pipe(map((resp:any)=>resp.data));
  }

  getProyecto(id:number):Observable<Project>{
    const url =`${this.proyectosUrl}/${id}`;
    return this.http.get<Project>(url).pipe(map((resp:any)=>resp.data));
  }

  addProyecto(proyecto:Project):Observable<Project>{
    return this.http.post<Project>(this.proyectosUrl,proyecto,this.options).pipe(map((resp:any)=>resp.data));
  }
}

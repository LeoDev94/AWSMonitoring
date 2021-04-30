import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Project,ProjectApi } from 'src/util/types';

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

  addProyecto(proyecto:ProjectApi):Observable<Project>{
    return this.http.post<Project>(this.proyectosUrl,proyecto,this.options).pipe(map((resp:any)=>resp.data));
  }

  updateProyecto(proyecto:ProjectApi):Observable<Project>{
    const url =`${this.proyectosUrl}/${proyecto.id!}`;
    return this.http.put<Project>(url,proyecto,this.options).pipe(map((resp:any)=>resp.data));
  }

  deleteProyecto(id:number):Observable<boolean>{
    const url =`${this.proyectosUrl}/${id}`;
    return this.http.delete<boolean>(url,this.options).pipe(map((resp:any)=>resp.data))
  }
}

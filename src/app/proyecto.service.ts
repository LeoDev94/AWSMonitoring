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
  constructor(private http: HttpClient) { }

  getProyectos():Observable<Project[]>{
    return this.http.get<Project[]>(this.proyectosUrl,{ headers: {'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000'}}).pipe(map((resp:any)=>resp.data));
  }

  getProyecto(id:number):Observable<Project>{
    const url =`${this.proyectosUrl}/${id}`;
    return this.http.get<Project>(url);
  }

  addProyecto(){}
}

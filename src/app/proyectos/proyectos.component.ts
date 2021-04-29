import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {ProyectoService} from 'src/app/proyecto.service'
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PROJECTS } from 'src/util/constants';
import { Project } from 'src/util/types';

import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'],
})
export class ProyectosComponent implements OnInit{

  //projects$: Observable<Project[]>;
  projects$:Project[] = [];
  filter = new FormControl('');
  selectedProject:Project|null = null;
  localProjects = PROJECTS;

  faTrashAlt = faTrashAlt;
  faEdit = faEdit;

  newProyectView = false;
  editProjectView = false;

  //NEW PROJECT
  code = "";
  state = "";
  deploymentState = "";
  deploymentDate = "";
  projectManagers: string[] = [];
  repository = "";

  pmTempName = "";
  idTemp = 0;

  constructor(private router: Router,private proyectoService:ProyectoService) {
    //this.proyectoService.getProyectos().subscribe(proyectos=>this.projects$ = proyectos);
    /*this.projects$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.projectSearch(text))
    );*/
  }

  ngOnInit(){
    this.getProyectos();
    this.projectSearch('');
  }

  getProyectos(){
    this.proyectoService.getProyectos().subscribe(proyectos=>{
      this.projects$ = proyectos;
      this.projects$ = this.projects$.map((project:Project)=>{
        project.deploymentState = project.ultimoDespliegue?'Desplegado':'No Desplegado';
        return project;
      })
    });
  }

  createProyecto(){
    //TODO: Finish
    let nombre = 'nuevo';
    this.proyectoService.addProyecto({nombre} as  Project).subscribe(project=>this.projects$.push(project));
  }

  projectSearch(text: string): Project[] {
    //var projects: Project[] = [];
    //this.proyectoService.getProyectos().subscribe(proyectos=>projects = proyectos);
    
    return this.projects$.filter(project => {
      const term = text.toLowerCase();
      return project.codigo.toLowerCase().includes(term)
        || project.estado.toLowerCase().includes(term)
        || project.deploymentState.toLowerCase().includes(term)
        || project.ultimoDespliegue.includes(term)
    })
  }

  projectDetail(id: number) {
    this.router.navigate(['/proyectos/' + id])
  }

  newProyect() {
    this.newProyectView = !this.newProyectView;
    this.editProjectView = false;
  }

  addProjectManager() {
    if (this.pmTempName == "") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes ingresar por lo menos el nombre de un Project Manager',
      })
    } else {
      this.projectManagers.push(this.pmTempName);
      this.pmTempName = "";
    }
  }

  deleteProjectManager(name: string) {
    let index = this.projectManagers.indexOf(name);
    if (index > -1) {
      this.projectManagers.splice(index, 1);
    }
  }

  saveProject(edit?: boolean) {

    if (this.code == "" || this.state == "" || this.state == "" || this.deploymentState == "" || this.deploymentDate == "" || this.repository == "" || this.projectManagers.length == 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes llenar todos los campos en blanco',
      })
    } else {
      if (edit) {
        let projectPayload: Project = {
          id: this.idTemp,
          nombre:'',
          manager1:'',
          manager2:'',
          tecnologia:'',
          tipo:'',
          codigo: this.code,
          estado: this.state,
          deploymentState: this.deploymentState,
          ultimoDespliegue: this.deploymentDate,
          primerDespliegue:'',
          servicesCost: [ //Se ingresaran los costos de manera estática ya que será parte de un servicio de aws
            {
              service: 'Code Deploy',
              unitCost: '1$/despliegue',
              dailyCost: 2,
              previousMonthCost: 0
            },
            {
              service: 'EC2',
              unitCost: '0.8$/día',
              dailyCost: 5,
              previousMonthCost: 18
            },
          ],
          repositorio: this.repository,
          projectManagers: this.projectManagers
        }

        let indexToEdit = this.localProjects.findIndex((value) => { return value.id == this.idTemp });
        if (indexToEdit > -1) {
          this.localProjects.splice(indexToEdit, 1);
          this.localProjects.push(projectPayload);

          Swal.fire({
            icon: 'success',
            title: 'Genial',
            text: 'Tu proyecto ha sido editado con éxito.',
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se encontró el proyecto con código ' + this.code,
          })
        }
      } else {
        let projectPayload: Project = {
          id: Math.random() * 10,
          nombre:'',
          manager1:'',
          manager2:'',
          tecnologia:'',
          tipo:'',
          codigo: this.code,
          estado: this.state,
          deploymentState: this.deploymentState,
          ultimoDespliegue: this.deploymentDate,
          primerDespliegue:'',
          servicesCost: [ //Se ingresaran los costos de manera estática ya que será parte de un servicio de aws
            {
              service: 'Code Deploy',
              unitCost: '1$/despliegue',
              dailyCost: 2,
              previousMonthCost: 0
            },
            {
              service: 'EC2',
              unitCost: '0.8$/día',
              dailyCost: 5,
              previousMonthCost: 18
            },
          ],
          repositorio: this.repository,
          projectManagers: this.projectManagers
        }
        this.localProjects.push(projectPayload);

        Swal.fire({
          icon: 'success',
          title: 'Genial',
          text: 'Tu proyecto ha sido ingresado con éxito.',
        })

      }
      this.newProyectView = false;
      this.editProjectView = false;
      this.resetProjectData();
    }

  }

  editProject(project: Project) {
    this.editProjectView = !this.editProjectView;

    this.idTemp = project.id;

    this.code = project.codigo;
    this.state = project.estado;
    this.deploymentState = project.deploymentState;
    this.deploymentDate = project.ultimoDespliegue;
    this.repository = project.repositorio;
    this.projectManagers = project.projectManagers;
  }

  newProject(){
    
  }

  sleep(time: any) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  resetProjectData() {
    this.code = "";
    this.state = "";
    this.deploymentState = "";
    this.deploymentDate = "";
    this.repository = "";
    this.projectManagers = [];
    this.idTemp = 0;
  }

  deleteProject(project: Project) {
    Swal.fire({
      title: '¿Estás seguro que quieres eliminar el proyecto?',
      text: "Ya no podrás recuperar la información del proyecto " + project.codigo,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        let indexToEdit = this.localProjects.findIndex((value) => { return value.id == project.id });
        if (indexToEdit > -1) {
          this.localProjects.splice(indexToEdit, 1);
          this.newProyectView = true;
          Swal.fire(
            'Proyecto eliminado!',
            'El proyecto ha sido eliminado con éxito.',
            'success'
          )
          this.sleep(1).then(() => {
            this.newProyectView = false;
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se encontró el proyecto con código ' + this.code,
          })
        }

      }
    })
  }
}

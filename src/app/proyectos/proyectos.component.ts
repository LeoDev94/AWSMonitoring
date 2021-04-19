import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PROJECTS } from 'src/util/constants';
import { Project } from 'src/util/types';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'],
})
export class ProyectosComponent {

  projects$: Observable<Project[]>;
  filter = new FormControl('');

  constructor(private router: Router) {
    this.projects$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.projectSearch(text))
    );
  }

  projectSearch(text: string): Project[] {
    return PROJECTS.filter(project => {
      const term = text.toLowerCase();
      return project.code.toLowerCase().includes(term)
        || project.state.toLowerCase().includes(term)
        || project.deploymentState.toLowerCase().includes(term)
        || project.deploymentDate.includes(term)
    })
  }

  projectDetail(id: number) {
    this.router.navigate(['/proyectos/' + id])
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PROJECTS } from 'src/util/constants';
import { Project } from 'src/util/types';
import { faUsers, faRocket, faCodeBranch, faArchive, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-proyecto-detail',
  templateUrl: './proyecto-detail.component.html',
  styleUrls: ['./proyecto-detail.component.css']
})
export class ProyectoDetailComponent implements OnInit {

  project?: Project;
  noProject = false;
  faUsers = faUsers;
  faRocket = faRocket;
  faCodeBranch = faCodeBranch;
  faArchive = faArchive;
  faChevronLeft = faChevronLeft;

  constructor(private route: ActivatedRoute, private router: Router) {
    let id = this.route.snapshot.paramMap.get('id');
    let projects = PROJECTS.filter((proj) => {
      return proj.id.toString() == id;
    })

    if (projects.length == 0) {
      this.noProject = true;
    } else {
      this.project = projects[0];
    }
  }

  goBack() {
    this.router.navigate(['/proyectos'])
  }

  ngOnInit(): void {
  }

}

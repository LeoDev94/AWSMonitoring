import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PROJECTS } from 'src/util/constants';
import { Project } from 'src/util/types';
import { faUsers, faRocket, faCodeBranch, faArchive, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { ProyectoService } from '../proyecto.service';
import { number } from 'echarts';


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

  options: any;

  constructor(private route: ActivatedRoute, private router: Router,private proyectoService: ProyectoService) {
    /*let projects = PROJECTS.filter((proj) => {
      return proj.id.toString() == id;
    })

    if (projects.length == 0) {
      this.noProject = true;
    } else {
      this.project = projects[0];
    }*/
  }

  getProyecto(){
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      const nid = +id;
      this.proyectoService.getProyecto(nid).subscribe(proyect=>this.project=proyect);
    }
  }

  goBack() {
    this.router.navigate(['/proyectos'])
  }

  ngOnInit(): void {
    this.getProyecto();
    const xAxisData = [];
    const data1 = [];
    const data2 = [];

    for (let i = 0; i < 100; i++) {
      xAxisData.push('category' + i);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

    this.options = {
      legend: {
        data: ['CodeDeploy', 'EC2'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'CodeDeploy',
          type: 'bar',
          data: data1,
          animationDelay: (idx: any) => idx * 10,
        },
        {
          name: 'EC2',
          type: 'bar',
          data: data2,
          animationDelay: (idx: any) => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx: any) => idx * 5,
    };
  }

}

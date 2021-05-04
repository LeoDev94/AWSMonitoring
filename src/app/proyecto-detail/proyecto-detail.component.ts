import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PROJECTS } from 'src/util/constants';
import { Project,Logs } from 'src/util/types';
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
  listaMetricas:string[]=[];
  metrica:string="Métricas";
  options: any;
  msjLogs:Logs[] =[];
  constructor(private route: ActivatedRoute, private router: Router,private proyectoService: ProyectoService) {
  }

  getProyecto(){
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      const nid = +id;
      this.proyectoService.getProyecto(nid).subscribe(proyect=>{
        this.project=proyect;
        this.project.ultimoDespliegue = this.project.ultimoDespliegue?this.project.ultimoDespliegue:'---';
      });
    }
  }

  getListaMetricas(){
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      const nid = +id;
      this.proyectoService.getMetricas(nid).subscribe(met=>this.listaMetricas = met);
    }
  }

  getMetricData(){
    if(this.listaMetricas.includes(this.metrica)){
      const id = this.route.snapshot.paramMap.get('id');
      if(id){
        const nid = +id;
        this.proyectoService.getMetricData(nid,this.metrica).subscribe(dat=>{
          const xData = dat[0].Timestamps;
          const yData = dat[0].Values;
          this.setGraph(xData,yData);
        });
      }
    }
  }

  getLogs(){
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      const nid = +id
      this.proyectoService.getLogs(nid).subscribe((dat)=>{
        this.msjLogs = dat;
      })
    }
  }

  selectMetrica(met:string){
    this.metrica=met;
    this.getMetricData();
  }

  goBack() {
    this.router.navigate(['/proyectos'])
  }

  setGraph(xAxis:any[],yAxis:any[]){
    const met = this.metrica!='Métricas'?this.metrica:'';
    this.options = {
      legend: {
        data: [met],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: xAxis,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: met,
          type: 'line',
          data: yAxis,
          animationDelay: (idx: any) => idx * 10,
        }
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx: any) => idx * 5,
    };
  }

  ngOnInit(): void {
    this.getProyecto();
    this.getListaMetricas();
    this.getLogs();
    this.setGraph([],[]);
  }

}

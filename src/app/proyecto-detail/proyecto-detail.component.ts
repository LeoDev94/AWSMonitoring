import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { PROJECTS } from 'src/util/constants';
import { Project,Logs, Services,ProjectApi, RepositorioApi } from 'src/util/types';
import { faUsers, faRocket, faCodeBranch, faArchive, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { ProyectoService } from '../proyecto.service';
import { number } from 'echarts';
import Swal from 'sweetalert2'

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
  listaMetricas:any[]=[];
  metrica:string="Métricas";
  options: any;
  msjLogs:Logs[] =[];
  precios:any[]=[];
  timeframe:string='lastHora';
  repos:RepositorioApi[]=[];

  constructor(private route: ActivatedRoute, private router: Router,private proyectoService: ProyectoService) {
  }

  getProyecto(){
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      const nid = +id;
      this.proyectoService.getProyecto(nid).subscribe(proyect=>{
        this.project=proyect;
        this.project.deploymentState = proyect.ultimoDespliegue?'Desplegado':'No Desplegado';
        this.project.ultimoDespliegue = this.project.ultimoDespliegue?this.project.ultimoDespliegue:'---';
      });
    }
  }

  getRepos(){
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      const nid = +id;
      this.proyectoService.getRepos(nid).subscribe(reps=>{
        this.repos = reps;
        if(this.repos.length>0){
          this.getLogs(this.repos[0].id!);
        }
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

  getName(id:number){
    let rep = this.repos.find(()=>{return{id:id}});
    if(rep){
      return rep.nombre;
    }
    return "";
  }

  getMetricData(lista:any[],id:number){
    if(lista.includes(this.metrica)){
      //const id = this.route.snapshot.paramMap.get('id');
      if(id){
        const nid = +id;
        this.proyectoService.getMetricData(nid,this.metrica,this.timeframe).subscribe(dat=>{
          const xData = dat[0].Timestamps;
          const yData = dat[0].Values;
          this.setGraph(xData,yData);
        });
      }
    }
  }

  getLogs(id:number){
    //const id = this.route.snapshot.paramMap.get('id');
    if(id){
      const nid = +id
      
      this.proyectoService.getLogs(nid).subscribe((dat)=>{
        this.msjLogs = dat;
      })
    }
  }

  getPrecios(){
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      const nid = +id;
      this.proyectoService.getPrecios(nid).subscribe((data)=>{
        this.precios=data;
        for(let dato of this.precios){
          dato.costos = dato.costos.map((dat:any)=>{
            if(dat.unidad === 'OnPremUpdates'){
              dat.usd = 0;
              dat.unidad = 'EC2Updates'
            }
            if(dat.unidad==='Hrs'||dat.unidad==='GB-Mo'){
              dat.monthAprox = dat.usd*24*30;
            }else{
              dat.monthAprox = dat.usd;
            }
            return dat;
          });
        }
      });
    }
  }

  desplegarProyecto(){
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      const nid = +id;
      this.proyectoService.desplegarProyecto(nid).subscribe(dat=>{
        Swal.fire(
          'Proyecto desplegado!',
          'El proyecto ha sido desplegado con éxito.',
          'success'
        );
        this.incializarDatos();
        
      });
    }
  }

  selectMetrica(lista:any[],met:string,id:number){
    this.metrica=met;
    this.getMetricData(lista,id);
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

  changeTimeFrame(tf:string){
    this.timeframe = tf;
    //this.getMetricData();
  }

  sumMonth(){
    var suma:number = 0;
    for(let pre of this.precios){
      for(let cost of pre.costos){
        suma+= +cost.monthAprox;
      }
    }
    return suma;
  }

  incializarDatos(){
    this.getProyecto();
    this.getListaMetricas();
   
    this.setGraph([],[]);
    this.getPrecios();
    this.getRepos();
   
  }

  ngOnInit(): void {
    this.incializarDatos();
  }

}

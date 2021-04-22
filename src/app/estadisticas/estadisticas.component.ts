import { Component, OnInit } from '@angular/core';


var datos = [
  {
    "name": "Desplegados",
    "value": 8940000
  },
  {
    "name": "No desplegados",
    "value": 5000000
  }
];

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  datos:any[] = [];
  view:[number,number] = [700, 400];
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  constructor() { 
    Object.assign(this,{datos});
  }

  ngOnInit(): void {
  }

}

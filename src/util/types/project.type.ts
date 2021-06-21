interface ServiceCost {
    service: string;
    unitCost: string;
    dailyCost: number;
    previousMonthCost: number;
}
interface RepositorioApi{
    id:number|null;
    nombre:string;
    url:string;
    ultimoDespliegue:string|null;
    primerDespliegue:string|null;
}
export interface Project {
    id: number|null,
    nombre: string,
    estado: string;
    codigo: string;
    deploymentState: string;
    ultimoDespliegue: string|null;
    primerDespliegue: string|null;
    tecnologia:string;
    tipo:string;
    managers: string[];
    repositorios: RepositorioApi[];
    servicesCost: ServiceCost[];
}
interface ServiceCost {
    service: string;
    unitCost: string;
    dailyCost: number;
    previousMonthCost: number;
}

export interface Project {
    id: number,
    nombre: string,
    estado: string;
    codigo: string;
    deploymentState: string;
    ultimoDespliegue: string;
    primerDespliegue: string;
    manager1:string;
    manager2:string;
    tecnologia:string;
    tipo:string;
    projectManagers: string[];
    repositorio: string;
    servicesCost: ServiceCost[];
}
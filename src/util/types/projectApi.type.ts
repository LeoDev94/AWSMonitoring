export interface RepositorioApi{
    id:number|null;
    nombre:string;
    url:string;
    ultimoDespliegue:string|null;
    primerDespliegue:string|null;
}
export interface ProjectApi{
    id:number|null;
    nombre: string,
    estado: string;
    codigo: string;
    ultimoDespliegue: string;
    primerDespliegue: string;
    tecnologia:string;
    tipo:string;
    managers: string[];
    repositorios:RepositorioApi[]
}
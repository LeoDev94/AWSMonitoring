import { Project } from "../types";

export const PROJECTS: Project[] = [
    {
        id: 1,
        state: 'Activo',
        code: 'PRY201999',
        deploymentState: 'No Desplegado',
        deploymentDate: '02/02/2019',
        projectManagers: ['Jefe de Proyecto 1', 'Jefe de Proyecto 2'],
        repository: 'https://git.com',
        servicesCost: [
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
        ]
    },
    {
        id: 2,
        state: 'Terminado',
        code: 'PRY201999',
        deploymentState: 'Desplegado',
        deploymentDate: '02/02/2019',
        projectManagers: ['Jefe de Proyecto 1', 'Jefe de Proyecto 2'],
        repository: 'https://git.com',
        servicesCost: [
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
        ]
    },
    {
        id: 3,
        state: 'Nuevo',
        code: 'PRY201999',
        deploymentState: 'No Desplegado',
        deploymentDate: '02/02/2019',
        projectManagers: ['Jefe de Proyecto 1', 'Jefe de Proyecto 2'],
        repository: 'https://git.com',
        servicesCost: [
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
        ]
    }
]
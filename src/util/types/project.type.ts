interface ServiceCost {
    service: string;
    unitCost: string;
    dailyCost: number;
    previousMonthCost: number;
}

export interface Project {
    id: number,
    state: string;
    code: string;
    deploymentState: string;
    deploymentDate: string;
    projectManagers: string[];
    repository: string;
    servicesCost: ServiceCost[];
}
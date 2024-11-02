export interface Task {
    id: number;
    title: string;
    completed: boolean;
    startTime: Date;
    endTime?: Date;
}

export interface Catalog {
    id: number;
    name: string;
    description?: string;
    tasks: Task[];
}

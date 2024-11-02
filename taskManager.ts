import { Task, Catalog } from './types';

let catalogs: Catalog[] = [];

export function createCatalog(name: string, description?: string): Catalog {
    const newCatalog: Catalog = { id: Date.now(), name, description, tasks: [] }
    catalogs.push(newCatalog);
    return newCatalog;
}

export function deleteCatalog(id: number): boolean {
    const initialLengs = catalogs.length;
    catalogs = catalogs.filter(catalog => catalog.id !== id);
    return catalogs.length < initialLengs;
}

export function renameCatalog(id: number, newName: string): Catalog | undefined {
    const catalog = catalogs.find(catalog => catalog.id === id);
    if (catalog) {
        catalog.name = newName;
    }
    return catalog;
}

export function addTaskToCatalog(catalogID: number, title: string, startTime: Date, endTime?: Date): Task | undefined {
    const catalog = catalogs.find(catalog => catalog.id === catalogID);
    if (catalog) {
        const newTask: Task = { id: Date.now(), title, completed: false, startTime, endTime };
        catalog.tasks.push(newTask);
        return newTask;
    }
    return undefined;
}

export function deleteTaskFromCatalog(catalogID: number, taskID: number): boolean {
    const catalog = catalogs.find(catalog => catalog.id === catalogID);
    if (catalog) {
        const initialLengs = catalog.tasks.length;
        catalog.tasks = catalog.tasks.filter(task => task.id !== taskID);
        return catalog.id < initialLengs;
    }
    return false;
}

export function moveTaskToAnotherCatalog(taskId: number, fromCatalogId: number, toCatalogId: number): boolean {
    const fromCatalog = catalogs.find(catalog => catalog.id === fromCatalogId);
    const toCatalog = catalogs.find(catalog => catalog.id === toCatalogId);
    const task = fromCatalog?.tasks.find(task => task.id === taskId);

    if (task && fromCatalog && toCatalog) {
        fromCatalog.tasks = fromCatalog.tasks.filter(t => t.id !== taskId);
        toCatalog.tasks.push(task);
        return true;
    }
    return false;
}

export function markTaskCompleted(catalogID: number, taskId: number): Task | undefined {
    const catalog = catalogs.find(catalog => catalog.id === catalogID);
    const task = catalog?.tasks.find(task => task.id === taskId);
    if (task) {
        task.completed = true;
    }
    return task;
}

export function listCatalogs(): Catalog[] {
    return catalogs;
}

export function listTasksInCatalog(catalogID: number): Task[] | undefined {
    return catalogs.find(catalog => catalog.id === catalogID)?.tasks;
}
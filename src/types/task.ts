export interface Task {
    id: number;
    name: string;
    // 经办人
    projectId: number;
    processorId: number;
    // 任务组
    epicId: number;
    kanbanId: number;
    // bug or task
    typeId: number;
    note: string;
}
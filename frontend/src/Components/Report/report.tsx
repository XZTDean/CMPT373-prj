export interface ReportMetadata {
    id: number,
    name: string,
    departmentId: number,
    departmentName: string,
    month: string,
    createdAt: number,
    editedAt: number,
    createdBy: string,
    editedBy: string,
}

export interface ReportData {
    id: number,
    questions: Question,
    groupings: string
}

export interface Question {
    id: number,
    createdAt: number,
    editedAt: number,
    departmentId: number,
    group: string,
    order: number,
    question: string,
    answer: string,
    choices: string,
    type: string
}
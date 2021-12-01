export interface ReportMetadata {
    id?: number,
    name?: string,
    departmentId?: number,
    departmentName?: string,
    month?: string,
    createdAt?: number,
    editedAt?: number,
    createdBy?: string,
    editedBy?: string,
}

export interface ReportData {
    id: number,
    questions: Question[],
    groupings: string
}

export interface Report {
    data: ReportData,
    metadata: ReportMetadata,
}

export interface Question {
    id: number,
    createdAt?: number,
    editedAt?: number,
    departmentId: number,
    group: string,
    order: number,
    question: string,
    answer: string,
    choices: string,
    type: string
}

export function responseToReport(r: any): Report {
    let metadata: ReportMetadata = {
        id: r.id,
        name: r.name,
        month: r.month,
        departmentId: r.departmentId,
        departmentName: r.departmentName,
        createdAt: r.createdAt,
        createdBy: r.createdBy,
        editedAt: r.editedAt,
        editedBy: r.editedBy
    }
    let data: ReportData = {
        id: r.id,
        questions: [],
        groupings: r.groupings
    }
    r.questions.forEach((q: any) => {
        let question: Question = {
            answer: q.answer,
            choices: q.choices,
            createdAt: q.createdAt,
            departmentId: q.departmentId,
            editedAt: q.editedAt,
            group: q.group,
            order: q.order,
            question: q.question,
            type: q.type,
            id: q.id
        }
        data.questions.push(question);
    })
    return {metadata: metadata, data: data}
}
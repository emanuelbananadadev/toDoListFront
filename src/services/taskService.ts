import {api} from "./api"

export type Task = {
    id: string
    title: string
    completed: boolean

    notes: string | null
    dueDate: string
    createdAt: string
    type: 'TRABALHO' | 'PROVA' | 'REUNIAO' | 'APRESENTACAO'
    icon: string

    hasReminder: boolean
    reminderTime: string | null

    userId: string

}

type ListResponse = {
    tasks: Task[]
    page: number
    total: number
    totalPages: number

    user: {id: string, email: string, name: string }
}

export type CreateTaskData = Omit<Task, 'id' | 'createdAt' | 'userId'>

export async function createTask(data: CreateTaskData) {
    try {
        const response = await api.post('/task', data)

        return response.data.newTask as Task
    } catch (error) {
        throw new Error("Erro ao criar tarefa. Verifique se todos os campos estão preenchidos corretamente.")
    }
}

export async function listTasks(page: number = 1, limit: number = 10) {
    try {
        const response = await api.get('/task', {
            params: { page, limit}
        })

        return response.data as ListResponse
    } catch (error) {
        throw new Error("Não foi possível carregar as tarefas. Sua sessão pode ter expirado")
    }
}

export async function deleteTask(id: string) {
    return api.delete(`/task/${id}`)
}

export async function updateTask(id: string, data: Partial<Task>) {
    const response = await api.put(`/task/${id}`, data)

    return response.data.taskForUpdate
}
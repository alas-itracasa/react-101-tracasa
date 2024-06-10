import axios from 'axios'
import { Task, TaskWithoutId } from '../types'

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000/api',
})

const normalizeTask = (task: Task): Task => ({ ...task, completed: !!task.completed })

const useTasksApi = () => {
  const getTasks = async (): Promise<Task[]> => {
    const response = await axiosClient.get('/tasks')
    return response.data?.map((task: Task) => normalizeTask(task))
  }

  const postTask = async (task: TaskWithoutId): Promise<Task> => {
    const response = await axiosClient.post('/tasks', { ...task, id: undefined })
    return normalizeTask(response.data.task)
  }

  const putTask = async (task: Task): Promise<Task> => {
    const response = await axiosClient.put(`/tasks/${task.id}`, task)
    return normalizeTask(response.data.task)
  }

  return {
    getTasks,
    postTask,
    putTask,
  }
}

export default useTasksApi

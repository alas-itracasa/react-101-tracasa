import { FC, useContext, useId } from 'react'
import { TaskWithoutId } from '../../types'
import { TasksContext } from '../TasksContext/TasksContext'
import css from './CreateTaskForm.module.css'

export interface CreateTaskFormProps {}

const CreateTaskForm: FC<CreateTaskFormProps> = () => {
  const { addTask } = useContext(TasksContext)
  const id = useId()

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const task: TaskWithoutId = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      completed: false,
    }
    addTask(task)
  }

  return (
    <form className={css.form} onSubmit={handleForm}>
      <label htmlFor={`${id}-title`}>Título</label>
      <input type="text" id={`${id}-title`} name="title" />
      <label htmlFor={`${id}-description`}>Descripción</label>
      <textarea id={`${id}-description`} name="description" />
      <button type="submit">Crear tarea</button>
    </form>
  )
}

export default CreateTaskForm

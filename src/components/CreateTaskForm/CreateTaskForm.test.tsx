import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { TasksContext } from '../TasksContext/TasksContext'
import CreateTaskForm from './CreateTaskForm'

describe('CreateTaskForm', () => {
  it('el formulario es accesible', async () => {
    const { container } = render(<CreateTaskForm />)
    const result = await axe(container)
    expect(result).toHaveNoViolations()
  })

  it('el formulario llama a addTask con los datos del formulario', async () => {
    const expectedValue = {
      title: 'Tarea 1',
      description: 'Descripción de la tarea 1',
      completed: false,
    }

    const addTaskSpy = vitest.fn()
    const user = userEvent.setup()
    const { getByRole } = render(
      <TasksContext.Provider value={{ tasks: [], addTask: addTaskSpy, updateTask: () => {} }}>
        <CreateTaskForm />
      </TasksContext.Provider>,
    )

    user.type(getByRole('textbox', { name: 'Título' }), expectedValue.title)
    user.type(getByRole('textbox', { name: 'Descripción' }), expectedValue.description)

    await user.click(
      getByRole('button', {
        name: 'Crear tarea',
      }),
    )
    expect(addTaskSpy).toHaveBeenCalled()
  })
})

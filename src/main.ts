import './styles/style.scss'
import {
  dragDrop,
  dragEnd,
  dragEnter,
  dragLeave,
  dragOver,
  dragStart,
} from './helpers/dragEvents'
import { addToStorage, getListFromStorage } from './helpers/localStorage'
import './helpers/modals'
import { formProps } from './interfaces/interfaces'

window.addEventListener('DOMContentLoaded', () => {
  initialColumns()
})

const columnTasks = document.querySelector<HTMLDivElement>('#toDoList')
const columns = document.querySelectorAll<HTMLDivElement>('.column-list')

// CURRENT COLUMN STATUS
const CONFIG = {
  lists: [
    {
      name: 'toDoList',
    },
    {
      name: 'inProgressList',
    },
    {
      name: 'pausedList',
    },
    {
      name: 'reviewList',
    },
    {
      name: 'completedList',
    },
  ],
}

CONFIG.lists.forEach((item, index) => {
  const response = getListFromStorage(item.name)

  if (columns[index].id === item.name) {
    columns[index].ondragstart = dragStart
    columns[index].ondragend = dragEnd
    columns[index].innerHTML = response.join(' ')
  }
})
// column drag events

const initialColumns = () => {
  columns.forEach((column) => {
    column.addEventListener('dragover', dragOver)
    column.addEventListener('dragenter', dragEnter)
    column.addEventListener('dragleave', dragLeave)
    column.addEventListener('drop', dragDrop)
  })
}

// form manipulation

const handleCreateTask = ({ title, description, priority }: formProps) => {
  const cardId = `${title.trim().split(' ').join('-')}-${Date.now()}`
  const cardTemplate = `<div class="card ${priority}" draggable="true" id="${cardId}">
              <p class="card__title">${title}</p>
              <p class="card__status">${priority}</p>
              <p class="card__description">
                ${description}
              </p>
            </div>`

  columnTasks!.insertAdjacentHTML('beforeend', cardTemplate)
  addToStorage('toDoList', cardTemplate)
}

const taskForm = document.querySelector<HTMLFormElement>('#taskForm')
taskForm?.addEventListener('submit', (e) => {
  e.preventDefault()
  const taskName = taskForm['task_name'] as HTMLInputElement
  const taskDescription = taskForm['task_description'] as HTMLInputElement
  const taskPriority = taskForm['task_priority'] as HTMLSelectElement

  const formData: formProps = {
    title: taskName.value,
    description: taskDescription.value,
    priority: taskPriority.value,
  }

  if (!!formData.title && !!formData.description && !!formData.priority) {
    handleCreateTask(formData)
    document.querySelector('.modal')?.classList.add('hidden')
    taskForm.reset()
  } else {
    alert('debes completar todos los campos')
  }
})

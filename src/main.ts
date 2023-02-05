import './styles/style.scss'
// import typescriptLogo from './typescript.svg'
// import { setupCounter } from './counter'

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="/vite.svg" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//     hola
//       <button class="mt-5" id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

// interfaces
interface formProps {
  title: string
  description: string
  priority: string
}
// interfaces

// draggable config

const columnTasks = document.querySelector<HTMLDivElement>('#columnTasks')
const columns = document.querySelectorAll<HTMLDivElement>('.column')
const buttonModal = document.querySelectorAll<HTMLButtonElement>(
  '.button-modal',
)
const modalBox = document.querySelector<HTMLDivElement>('.modal')

console.log('openm', buttonModal)
buttonModal.forEach((button) => {
  button?.addEventListener('click', () => {
    modalBox?.classList.toggle('hidden')
  })
})

let dragItem = HTMLDivElement || null
// card drag events
function dragStart(e: any) {
  console.log(
    'drag started',
    e.target,
    e.dataTransfer.setData('text/plain', e.target.id),
  )
  dragItem = e.target
  console.log('dragitem', dragItem)

  setTimeout(() => (e.target.className = 'hidden'), 0)
}
function dragEnd({ target }: any) {
  console.log('drag ended', target)
  target.classList.add('scale-up-center')
}

function dragOver(e: any) {
  e.preventDefault()
  e.target.classList.add('dragging')
}
function dragEnter({ target }: any) {
  console.log('drag entered', target.className)
}
function dragLeave({ target }: any) {
  target.classList.remove('dragging')
}
function dragDrop(e: any) {
  console.log('drag dropped', e.target)

  const id = e.dataTransfer.getData('text/plain')
  const draggable = document.getElementById(id) as HTMLDivElement

  if (e.target.className.includes('column')) {
    e.target.append(draggable)
  }
  e.target.classList.remove('dragging')
  draggable.classList.replace('hidden', 'card')
}

// column drag events

columns.forEach((column) => {
  column.addEventListener('dragover', dragOver)
  column.addEventListener('dragenter', dragEnter)
  column.addEventListener('dragleave', dragLeave)
  column.addEventListener('drop', dragDrop)
})

// form manipulation

const handleCreateTask = ({ title, description, priority }: formProps) => {
  console.log(title, description)

  const cardId = `${title.trim().split(' ').join('-')}-${Date.now()}`

  const cardTemplate = `
            <div class="card" draggable="true" id="${cardId}">
              <p class="card__title">${title}</p>
              <p class="card__status">${priority}</p>
              <p class="card__description">
                ${description}
              </p>
            </div>
`

  columnTasks!.insertAdjacentHTML('beforeend', cardTemplate)

  const cards = document.querySelectorAll<HTMLDivElement>('.card')
  cards.forEach((item) => {
    item.addEventListener('dragstart', dragStart)
    item.addEventListener('dragend', dragEnd)
  })
}

const taskForm = document.querySelector<HTMLFormElement>('#taskForm')
taskForm?.addEventListener('submit', (e) => {
  e.preventDefault()
  const taskName = taskForm['task_name'] as HTMLInputElement
  const taskDescription = taskForm['task_description'] as HTMLInputElement
  const taskPriority = taskForm['task_priority'] as HTMLSelectElement
  console.log('submit called', taskName.value, taskDescription.value)

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

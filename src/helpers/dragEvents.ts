import { addToStorage, removeFromStorage } from './localStorage'

let oldColumnId: string = ''
let currentColumnId: string = ''

export function dragStart(e: any) {
  oldColumnId = e.target.parentNode.id

  e.dataTransfer.setData('text/plain', e.target.id)
  setTimeout(() => e.target.classList.add('hidden'), 0)
}
export function dragEnd({ target }: any) {
  target.classList.remove('hidden')
}

export function dragOver(e: Event): void {
  e.preventDefault()
  const target = e.target as Element
  target.classList.add('dragging')
}
export function dragEnter(e: any) {
  currentColumnId = e.target.id
}
export function dragLeave({ target }: any) {
  target.classList.remove('dragging')
}

export function dragDrop(e: any) {
  e.preventDefault()

  const id = e.dataTransfer.getData('text/plain')
  const draggable = document.getElementById(id) as HTMLDivElement

  e.target.append(draggable)
  e.target.classList.remove('dragging')

  draggable.classList.remove('hidden')
  removeFromStorage(oldColumnId, draggable.outerHTML)
  addToStorage(currentColumnId, draggable.outerHTML)
}

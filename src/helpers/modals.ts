const buttonModal = document.querySelectorAll<HTMLButtonElement>(
  '.button-modal',
)
export const modalBox = document.querySelector<HTMLDivElement>('.modal')

buttonModal.forEach((button) => {
  button?.addEventListener('click', () => {
    modalBox?.classList.toggle('hidden')
  })
})

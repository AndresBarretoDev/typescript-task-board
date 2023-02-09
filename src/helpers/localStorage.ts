export function addToStorage(listId: any, inputValue: any) {
  let existingList = localStorage.getItem(listId)
  try {
    if (existingList) {
      const list = JSON.parse(existingList)
      list.push(inputValue)
      localStorage.setItem(listId, JSON.stringify(list))
    } else {
      const list = []
      list.push(inputValue)
      localStorage.setItem(listId, JSON.stringify(list))
    }
  } catch (e) {
    console.log(e, 'add to storage failed')
  }
}

export function removeFromStorage(listId: any, inputValue: any) {
  let existingList = localStorage.getItem(listId)
  try {
    if (existingList) {
      const list = JSON.parse(existingList)
      const index = list.findIndex((item: any) => item === inputValue)
      if (index > -1) {
        list.splice(index, 1)
      }
      localStorage.setItem(listId, JSON.stringify(list))
    }
  } catch (e) {
    console.log(e, 'remove from storage failed')
  }
}

export function getListFromStorage(listId: string) {
  try {
    const list = localStorage.getItem(listId)
    if (list) {
      return JSON.parse(list)
    }
    return []
  } catch (e) {
    console.log(e, 'retrieve failed')
    return []
  }
}

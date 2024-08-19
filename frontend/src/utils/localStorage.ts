const getItem = (key: string) => {
  return localStorage.getItem(key)
}

const createItem = (key: string, item: string) => {
  return localStorage.setItem(key, item)
}

const deleteItem = (key: string) => {
  return localStorage.removeItem(key)
}

const clearAll = () => {
  return localStorage.clear()
}

export default {
  getItem,
  createItem,
  deleteItem,
  clearAll
}
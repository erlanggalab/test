export function addCategory (name) {
  return {
    type: 'CATEGORY_ADD',
    payload: name
  }
}
export function editCategory (id, name) {
  return {
    type: 'CATEGORY_EDIT',
    id: id,
    name: name
  }
}
export function removeCategory (id) {
  return {
    type: 'CATEGORY_REMOVE',
    id: id
  }
}

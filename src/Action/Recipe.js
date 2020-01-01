export function addRecipe (name, description, category) {
  return {
    type: 'RECIPE_ADD',
    payload: name
  }
}
export function editRecipe (id, name, description, category) {
  return {
    type: 'RECIPE_EDIT',
    id: id,
    name: name,
    description: description,
    category: category
  }
}
export function removeRecipe (id) {
  return {
    type: 'RECIPE_REMOVE',
    id: id
  }
}

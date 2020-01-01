const INITIAL_STATE = {
  recipes: []
}
/*
  {
    '_id': '',
    'imageUrl': '',
    'title': '',
    'category': '',
    'description': '',
    'createdAt': '',
    'updatedAt': '',
  }
*/

const Reduce = (state = INITIAL_STATE, action) => {
  let index;
  let recipes
  switch (action.type) {
    case 'RECIPE_SET':
      return {
        ...state,
        recipes: action.payload
      }
    case 'RECIPE_ADD':
      recipes = [
        ...state.recipes,
        {
          '_id': (state.recipes.length === 0 ? -1 : state.recipes[state.recipes.length - 1]._id) + 1,
          'name': action.payload
        }
      ]
      return {
        recipes: recipes
      }
    case 'RECIPE_EDIT':
      index = state.recipes.findIndex(v => v._id === action.id)
      state.recipes[index].name = action.name
      state.recipes[index].category = action.category
      state.recipes[index].description = action.description
      return {
        recipes: state.recipes
      }
    case 'RECIPE_REMOVE':
      recipes = state.recipes.filter(v => v._id !== action.id)
      return {
        recipes: recipes
      }
    default:
      return state
  }
}

export default Reduce

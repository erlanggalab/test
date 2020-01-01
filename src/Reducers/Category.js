
const INITIAL_STATE = {
  categories: [{
    '_id': 0,
    'name': 'Nasi Goreng'
  }]
}
/*
  {
    '_id': '',
    'name': ''
  }
*/
const Reduce = (state = INITIAL_STATE, action) => {
  let index;
  let categories
  switch (action.type) {
    case 'CATEGORY_SET':
      return {
        ...state,
        categories: action.payload
      }
    case 'CATEGORY_ADD':
      categories = [
        ...state.categories,
        {
          '_id': (state.categories.length === 0 ? -1 : state.categories[state.categories.length - 1]._id) + 1,
          'name': action.payload
        }
      ]
      return {
        categories: categories
      }
    case 'CATEGORY_EDIT':
      index = state.categories.findIndex(v => v._id === action.id)
      state.categories[index].name = action.name
      return {
        categories: state.categories
      }
    case 'CATEGORY_REMOVE':
      categories = state.categories.filter(v => v._id !== action.id)
      return {
        categories: categories
      }
    default:
      return state
  }
}

export default Reduce

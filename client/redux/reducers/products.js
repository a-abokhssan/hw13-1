import axios from 'axios'

const GET_PRODUCTS = 'GET_PRODUCTS'
const ADD_SELECTION = 'ADD_SELECTION'
const REMOVE_SELECTION = 'REMOVE_SELECTION'

const initialState = {
  list: [],
  selection: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, list: action.list }
    case ADD_SELECTION:
      return {
        ...state,
        selection: { ...state.selection, [action.id]: (state.selection[action.id] || 0) + 1 }
      }
    case REMOVE_SELECTION:
      return {
        ...state,
        selection: { ...state.selection, [action.id]: (state.selection[action.id] || 0) - 1 }
      }
    default:
      return state
  }
}

export function addSelection(id) {
  return { type: ADD_SELECTION, id }
}

export function removeSelection(id) {
  return { type: REMOVE_SELECTION, id }
}

export function getProducts() {
  return (dispatch) => {
    axios('/api/v1/products').then(({ data }) => {
      dispatch({ type: GET_PRODUCTS, list: data })
    })
  }
}

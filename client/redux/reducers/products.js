import axios from 'axios'

const GET_PRODUCTS = 'GET_PRODUCTS'
const ADD_SELECTION = 'ADD_SELECTION'
const REMOVE_SELECTION = 'REMOVE_SELECTION'
const GET_RATES = 'GET_RATES'
const SET_BASE = 'SET_BASE'

const initialState = {
  list: [],
  selection: {},
  rates: {},
  base: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BASE:
      return { ...state, base: action.base }
    case GET_PRODUCTS:
      return { ...state, list: action.list }
    case GET_RATES:
      return { ...state, rates: action.rates }
    case ADD_SELECTION:
      return {
        ...state,
        selection: { ...state.selection, [action.id]: (state.selection[action.id] || 0) + 1 }
      }
    case REMOVE_SELECTION: {
      const newSelection = {
        ...state.selection,
        [action.id]: state.selection[action.id] - 1
      }
      if (newSelection[action.id] <= 0) {
        delete newSelection[action.id]
      }
      return {
        ...state,
        selection: newSelection
      }
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

export function getRates() {
  return (dispatch) => {
    axios('/api/v1/rates').then(({ data }) => {
      dispatch({ type: GET_RATES, rates: data })
    })
  }
}

export function setBase(base) {
  return { type: SET_BASE, base }
}

import axios from 'axios'

const GET_PRODUCTS = '@@GET_PRODUCTS'
const ADD_SELECTION = 'ADD_SELECTION'
const REMOVE_SELECTION = 'REMOVE_SELECTION'
const GET_RATES = '@@GET_RATES'
const SET_BASE = 'SET_BASE'
const SET_STATUS = 'SET_STATUS'
const GET_LOGS = '@@GET_LOGS'
const DELETE_LOGS = '@@DELETE_LOGS'

const initialState = {
  list: [],
  selection: {},
  rates: {},
  base: '',
  basket: [],
  status: '',
  logs: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_STATUS:
      return { ...state, status: action.status }
    case SET_BASE:
      return { ...state, base: action.base }
    case GET_PRODUCTS:
      return { ...state, list: action.list }
    case GET_RATES:
      return { ...state, rates: action.rates }
    case GET_LOGS:
      return { ...state, logs: action.logs }
    case DELETE_LOGS:
      return { ...state, logs: [] }
    case ADD_SELECTION:
      return {
        ...state,
        selection: { ...state.selection, [action.id]: (state.selection[action.id] || 0) + 1 },
        basket: { ...state.basket, [action.id]: action.basket }
      }
    case REMOVE_SELECTION: {
      const newSelection = {
        ...state.selection,
        [action.id]: state.selection[action.id] - 1
      }
      const newBasket = {
        ...state.basket,
        [action.id]: action.basket
      }
      if (newSelection[action.id] <= 0 || newBasket[action.id] <= 0) {
        delete newSelection[action.id]
        delete newBasket[action.id]
      }
      return {
        ...state,
        selection: newSelection,
        basket: newBasket
      }
    }
    default:
      return state
  }
}

export function addSelection(id, basket) {
  return { type: ADD_SELECTION, id, basket }
}

export function removeSelection(id, basket) {
  return { type: REMOVE_SELECTION, id, basket }
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

export function getLogs() {
  return (dispatch) => {
    axios('/api/v1/logs').then(({ data }) => {
      dispatch({ type: GET_LOGS, logs: data })
    })
  }
}

export function deleteLogs() {
  axios.delete('/api/v1/logs')
  return (dispatch) => {
    dispatch({ type: DELETE_LOGS })
  }
}

export function setBase(base) {
  return { type: SET_BASE, base }
}

export function setStatus(status) {
  return { type: SET_STATUS, status }
}

export function sortElements(arr, key) {
  switch (key) {
    case 'Price':
      return arr.sort((a, b) => b.price - a.price)
    case 'A-z':
      return arr.sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) return -1
        if (a.title.toLowerCase() > b.title.toLowerCase()) return 1
        return 0
      })
    default:
      return arr
  }
}

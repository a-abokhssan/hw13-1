import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setBase, setStatus } from '../redux/reducers/products'

const Header = () => {
  const dispatch = useDispatch()
  const list = useSelector((s) => s.products.list)
  const selection = useSelector((s) => s.products.selection)
  const base = useSelector((s) => s.products.base)
  const rates = useSelector((s) => s.products.rates)
  const getPrice = (id) => list.find((it) => it.id === id).price
  const sum = Object.entries(selection).reduce(
    (acc, [id, qty]) => acc + getPrice(id) * qty * (rates[base] || 1),
    0
  )
  const numberOfItems = Object.values(selection).reduce((acc, rec) => acc + rec, 0)
  return (
    <div>
      {['CAD', 'USD', 'EUR'].map((it) => {
        return (
          <button
            key={it}
            type="button"
            className={`mx-4 ${base === it ? 'text-red-700' : ''}`}
            onClick={() => {
              dispatch(setBase(it))
            }}
          >
            {it}
          </button>
        )
      })}
      <button type="button">
        <Link to="/basket">Basket</Link>
      </button>
      <button type="button">
        <Link to="/logs">Logs</Link>
      </button>
      <div>
        <button
          type="button"
          onClick={() => {
            dispatch(setStatus('Price'))
          }}
        >
          price
        </button>
        <button
          type="button"
          onClick={() => {
            dispatch(setStatus('A-z'))
          }}
        >
          A-z
        </button>
      </div>
      <div>{sum > 0 && sum.toFixed(2)}</div>
      <div>{numberOfItems > 0 && numberOfItems}</div>
    </div>
  )
}

export default Header

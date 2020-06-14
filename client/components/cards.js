import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addSelection, removeSelection, sortElements } from '../redux/reducers/products'

const Cards = () => {
  const dispatch = useDispatch()
  const base = useSelector((s) => s.products.base)
  const rates = useSelector((s) => s.products.rates)
  const list = useSelector((s) => s.products.list)
  const selection = useSelector((s) => s.products.selection)
  const status = useSelector((s) => s.products.status)
  const baseSymb = {
    USD: '$',
    EUR: '€',
    CAD: 'C$'
  }

  return (
    <div className="flex flex-wrap content-center justify-center">
      {sortElements(list, status).map((card) => {
        return (
          <div
            key={card.it}
            className="flex flex-col border-2 border-solid border-black w-64 h-64 p-2 m-4"
          >
            <div className="flex justify-center">
              <img className="h-32" src={card.image} alt={card.title} />
            </div>
            <div>{card.title}</div>
            <div>
              {(card.price * (rates[base] || 1)).toFixed(2)} {baseSymb[base] || '€'}
            </div>
            <div className="flex justify-between p-10">
              <button
                type="button"
                onClick={() => {
                  dispatch(removeSelection(card.id))
                }}
              >
                -
              </button>
              <div>{selection[card.id] || 0}</div>
              <button
                type="button"
                onClick={() => {
                  dispatch(addSelection(card.id, card))
                }}
              >
                +
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Cards

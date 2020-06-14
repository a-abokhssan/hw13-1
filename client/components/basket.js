import React from 'react'
import { useSelector } from 'react-redux'
import Header from './header'

const Basket = () => {
  /* const dispatch = useDispatch() */
  const base = useSelector((s) => s.products.base)
  const basket = useSelector((s) => s.products.basket)
  const rates = useSelector((s) => s.products.rates)
  /*   const list = useSelector((s) => s.products.list) */
  /* const selection = useSelector((s) => s.products.selection) */
  const baseSymb = {
    USD: '$',
    EUR: '€',
    CAD: 'C$'
  }
  const basketsArray = Object.values(basket)
  return (
    <div className="flex flex-wrap content-center justify-center">
      <Header />
      {basketsArray.map((card) => {
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
          </div>
        )
      })}
    </div>
  )
}

export default Basket

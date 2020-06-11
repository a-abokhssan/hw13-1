import React from 'react'
import { useSelector } from 'react-redux'

const Header = () => {
  const list = useSelector((s) => s.products.list)
  const selection = useSelector((s) => s.products.selection)
  const getPrice = (id) => list.find((it) => it.id === id).price
  const sum = Object.entries(selection).reduce((acc, [id, qty]) => acc + getPrice(id) * qty, 0)
  const numberOfItems = Object.values(selection).reduce((acc, rec) => acc + rec, 0)
  return (
    <div>
      <div>{sum !== 0 && sum}</div>
      <div>{numberOfItems !== 0 && numberOfItems}</div>
    </div>
  )
}

export default Header

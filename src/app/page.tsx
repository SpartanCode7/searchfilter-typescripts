"use client"

import { Inter } from 'next/font/google'
import PropTypes from 'prop-types'
import data from '../../public/data.json'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

interface Category {
  id: number
  name: string
  description: string
}

interface Product {
  id: number
  name: string
  description: string
  price: number
  category_id: number
}

interface Props {
  categories: Category[]
  products: Product[]
}

export default function Home({ categories, products }: Props) {

  const [searchTerm, setSearchTerm] = useState('')

  const filteredCategories = data.categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="">
      <input
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search categories"
      />
      <ul>
        {filteredCategories.map(category => (
          <li key={category.id}>
            <h2>{category.name}</h2>
            <p>{category.description}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}

Home.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  })).isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category_id: PropTypes.number.isRequired,
  })).isRequired,
};

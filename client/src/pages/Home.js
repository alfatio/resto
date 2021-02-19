import React, { useEffect, useState } from 'react'
import api from '../config/axios'
import CardProduct from '../components/CardProduct'

function Home () {
  const [category, setCategory] = useState("")
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)

  const fetchProduct = async () => {
    const { data } = await api.get('/products')
    console.log(data);
    setProducts(data.products)
  }

  useEffect(() => {
    fetchProduct()
  },[])
  return(
    <div className="container mx-auto flex flex-col">
      <div className="flex flex-row">
        <select name="" id="" onChange={(e) => {
          setCategory(e.target.value)
        }} value={category}>
          <option value="">Kategori</option>
        </select>
      </div>
      <div className="container mx-auto grid grid-cols-5">
        {
          products.map(el => {
            return <CardProduct key={el.id} product={el} onDelete={fetchProduct}/>
          })
        }
      </div>
    </div>
  )
}

export default Home
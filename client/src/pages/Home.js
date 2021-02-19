import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../config/axios'
import CardProduct from '../components/CardProduct'
import Filedownload from 'js-file-download'

function Home () {
  const history = useHistory()
  const [category, setCategory] = useState("")
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [limit,setLimit] = useState(10)

  const fetchProduct = async () => {
    const { data } = await api.get(`/products?category=${category}&page=${page}&limit=${limit}`)
    console.log(data);
    setProducts(data.products)
  }

  const downloadXML = async () => {
    const { data } = await api.post(`/downloadxml`,{
      data:JSON.stringify(products)
    },{
      responseType: 'blob'
    })
    Filedownload(data,'Products.xml')
    console.log(data);
  }

  useEffect(() => {
    fetchProduct()
  },[category,limit])

  return(
    <div className="container mx-auto flex flex-col">
      <div className="flex flex-row mt-6 gap-x-8">
        <select name="" id="" onChange={(e) => {
          setCategory(e.target.value)
        }} value={category}>
          <option value="">Kategori</option>
          <option value="Makanan">Makanan</option>
          <option value="Snack">Snack</option>
        </select>
        <select name="" id="" value={limit} onChange={(e) => {
          setLimit(e.target.value)
        }} className="w-24">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
        <button className="p-2 bg-gray-500 text-center"  onClick={() => history.push('/add')}>Tambah Produk</button>
        <button className="p-2 bg-gray-500 text-center"  onClick={downloadXML}>Export to XML</button>
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
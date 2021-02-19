import React, { useEffect, useState } from 'react'
import { useParams, useHistory, useLocation } from 'react-router-dom'
import api from '../config/axios'

function Edit (props) {
  const params = useParams()
  const history = useHistory()
  const location = useLocation()
  const [input, setInput] = useState({
    category: "Makanan",
    name: "",
    slug: "",
    price: 0,
    img_url: "",
    stock: 0
  })

  const handleOnChange = (e) => {
    const key = e.target.name
    const newInput = {...input}
    newInput[key] = e.target.value
    setInput(newInput)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(input);
    try {
      if(location.pathname === '/add'){
        await api.post(`/products`,input)
      }else{
        await api.put(`/products/${params.id}`,input)
      }
      history.push('/')
    } catch (err) {
      console.log(err);
    }  
  }

  const fetchData = async () => {
    const { data } = await api.get(`/products/${params.id}`)
    let newObj = {...input}
    for(let key in data.products){
      if(key in input) {
        newObj[key] = data.products[key]
      }
    }
    setInput(newObj)
  }

  useEffect(() => {
    if(location.pathname !== '/add'){
      fetchData()
    }
  },[])

  return (
    <div className=" flex items-center justify-center">
        
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" >
                    category
                </label>
                {/* <input value={input.category} onChange={handleOnChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="category" type="text" placeholder="category" required/> */}
                <select value={input.category} onChange={handleOnChange} name="category" className="w-full">
                  <option value="Makanan">Makanan</option>
                  <option value="Snack">Snack</option>
                </select>
            </div>
            
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" >
                    nama
                </label>
                <input value={input.name} onChange={handleOnChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="name" type="text" placeholder="nama" required/>
            </div>
            
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" >
                    slug
                </label>
                <input value={input.slug} onChange={handleOnChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="slug" type="text" placeholder="slug" required/>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" >
                    price
                </label>
                <input value={input.price} onChange={handleOnChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="price" type="number" placeholder="price" required/>
            </div>

            <div className="mb-4">

                <label className="block text-gray-700 text-sm font-bold mb-2">
                    img_url
                </label>
                <textarea name="img_url" value={input.img_url} onChange={handleOnChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" required></textarea>
            </div>

            <div className="mb-4">

                <label className="block text-gray-700 text-sm font-bold mb-2">
                    stock
                </label> 
                <input value={input.stock} onChange={handleOnChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="stock" type="number" placeholder="category" required/>
              </div>

            
            <div className="flex items-center justify-between">
                <button id="submit" onClick={() => console.log(input)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit">
                      submit
                </button>
            </div>
        </form>
    </div>
  )
}

export default Edit
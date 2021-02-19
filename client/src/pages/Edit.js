import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../config/axios'

function Edit (props) {
  const params = useParams()
  const [input, setInput] = useState({
    category: "",
    name: "",
    slug: "",
    price: 0,
    img_url: "",
    stock: 0
  })

  const handleOnChange = (e) => {

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
    fetchData()
  },[])

  return (
    <div className=" flex items-center justify-center">
        
        <form id="form" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" >
                    category
                </label>
                <input value={input.category} onChange={handleOnChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="name" type="text" placeholder="category" required/>
            </div>
            
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" >
                    nama
                </label>
                <input value={input.name} onChange={handleOnChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="tel" id="tel" type="text" placeholder="nama" required/>
            </div>
            
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" >
                    slug
                </label>
                <input value={input.slug} onChange={handleOnChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="email" id="email" type="text" placeholder="slug" required/>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" >
                    price
                </label>
                <input value={input.price} onChange={handleOnChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="date" type="number" placeholder="price" required/>
            </div>

            <div className="mb-4">

                <label className="block text-gray-700 text-sm font-bold mb-2">
                    img_url
                </label>
                <textarea value={input.img_url} onChange={handleOnChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="message1" id="message1" type="text" required></textarea>
            </div>

            <div className="mb-4">

                <label className="block text-gray-700 text-sm font-bold mb-2">
                    stock
                </label> 
                <input value={input.stock} onChange={handleOnChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="name" type="number" placeholder="category" required/>
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
import React from 'react'
import { Link } from 'react-router-dom'
import api from '../config/axios'

function CardProduct (props) {

  return (
    <div className="lg:m-4 shadow-md hover:shadow-lg hover:bg-gray-100 rounded-lg bg-white my-12 mx-8 max-w-full max-h-64">
        <img src={props.product.img_url} alt="product" className="w-full h-3/5 p-2"/>
        <div className="w-full flex flex-row items-center h-2/5">
          <div className="w-1/2 flex flex-col items-start justify-center ml-2 h-full">
            <h6>{props.product.name}</h6>
            <p>{props.product.price}</p>
          </div>
          <div className="w-1/2 flex flex-col justify-center items-center h-full gap-2">
            <Link to={`/edit/${props.product.id}`} className="border-black rounded-sm border w-1/2 text-center">edit</Link>
            <button onClick={async () => {
              await api.delete(`/products/${props.product.id}`)
              props.onDelete()
            }} className="border-black rounded-sm border w-1/2">delete</button>
          </div>
        </div>
    </div>
  )
}

export default CardProduct
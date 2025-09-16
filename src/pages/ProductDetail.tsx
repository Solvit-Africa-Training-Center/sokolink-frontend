import React from 'react'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'

function ProductDetail() {
    const { id } = useParams();
  return (
      <div><Navbar />
          <div className='px-[120px]'>
              <h1 className='text-4xl font-bold text-black'>here is product detail</h1>
            {id}
          </div>
      </div>
  )
}

export default ProductDetail
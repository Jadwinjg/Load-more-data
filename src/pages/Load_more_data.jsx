import React, { useEffect, useState } from 'react'
import axios from "axios"

function Load_more_data() {
const [images, setImages] = useState([])
const [loading, setLoading] = useState(false)
const [count, setCount] = useState(0)
const [disabledBtn, setDisabledBtn] = useState(false)
  async function fetchImages(){
    try{
      setLoading(true)
       const res = await axios.get(`https://dummyjson.com/products?limit=20&skip=${count === 0 ? 0 : count*20 }`)
       setImages(prev => [...prev,  ...res.data.products])  
        console.log(res);      
    }
    catch(err){
      console.log(err);
    }
    finally{
       setLoading(false)
    }
  }

  useEffect(()=>{
   fetchImages()
  },[count])

  useEffect(()=>{
   if(images && images.length === 100) setDisabledBtn(true)
  },[images])

  if(loading){
    return <p>Loading data! please wait</p>
  }

  return (
    <div className='p-6 max-w-7xl mx-auto'>
      <div className=' grid sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-2'>
      {
        images && images.length>0 ? images.map((item,index)=>(
           <div key={`${item.id} ${index}`} className='border rounded-lg hover:shadow-xl transition p-6'>
            <img src={item.thumbnail} alt={item.category} className='w-full h-64 object-cover rounded'/>
            <p className='mt-2 text-sm font-semibold text-gray-800 text-center truncate'>{item.title}</p>
           </div>
        ))    
        : <p>No data available</p>
      }
    </div>

    <div className='mt-8 text-center'>
      <button onClick={()=>setCount(count+1)} disabled={disabledBtn}>Load More Data</button>
    <p className='mt-2 text-sm text-gray-600'>
      {disabledBtn === true ? "You have reached max products" : "Click to see more Products"}
    </p>
    </div>
    </div>
    
  )
}

export default Load_more_data
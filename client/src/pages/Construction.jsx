import React from 'react'
import { MdConstruction } from "react-icons/md";
import { Link } from 'react-router-dom';
import { FaHome } from "react-icons/fa";

const Construction = () => {
  return (
    <div className='flex items-center  flex-col justify-center w-[90vw] h-[90vh] rounded-md bg-slate-300 text-4xl '>
      <div>

      Sorry! This feature is on construction <span className='text-center'> <MdConstruction/></span>
      </div>
      <div className='bg-white rounded-md my-10 hover:bg-slate-400 p-1'>
        <Link className='' to={"/"}><FaHome/></Link>
      </div>
    </div>
  )
}

export default Construction

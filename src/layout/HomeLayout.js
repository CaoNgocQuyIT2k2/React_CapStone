import React from 'react'
// import Header from '../Components/Header/Header'
import { Outlet } from 'react-router-dom'
import Headers from './Navbar/Header'
import { Footers } from '../Page/HomePage/Navbar/Footers'

export default function HomeLayout() {
  return (
    <div className=''>
        <Headers/>
        <Outlet/>
        <Footers/>
    </div>
  )
}

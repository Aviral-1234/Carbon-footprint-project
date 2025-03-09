import React from 'react'
import Form from '../components/Form'
import Navbar from '../components/navBar' 
import Footer from '../components/Footer'
// import './formpage.css'

const Formpage = () => {
  return (
    <div className='h-screen w-full bg-zinc-900'>
      <Navbar/>
      <Form/>
      {/* <Footer/> */}
    </div>
  )
}

export default Formpage

import React from 'react'
import Footer from '../layouts/Footer'
import Navbar from '../layouts/Navbar'

function Home() {
  return (
    <div>
      <Navbar />
      <h1>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti, corrupti!</h1>
      <h2>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti, corrupti!</h2>
      <h3>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti, corrupti!</h3>
      <h4>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti, corrupti!</h4>
      <h5>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti, corrupti!</h5>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. <b>Dolorem vero</b> quae architecto pariatur asperiores provident fugiat delectus id dolorum distinctio.</p>
      <p className="small">Lorem ipsum dolor sit amet.</p>
      <Footer />
    </div>
  )
}

export default Home
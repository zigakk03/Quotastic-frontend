import React from 'react'
import Footer from '../layouts/Footer'
import Navbar from '../layouts/Navbar'
import { Link } from 'react-router-dom'
import Upvoted_quotes from '../helpers/Upvoted_quotes'

function Home() {
  return (
    <div>
      <Navbar />
        <div className="container-lg d-md-block d-lg-flex justify-content-between pt-5">
          <div className='d-sm-flex d-lg-block flex-column align-items-center pb-5'>
          <div>
          <h1 className='d-sm-none d-none d-md-block' style={{width: '556px'}} >Welcome<br /> to <span style={{color: '#DE8667'}}>Quotastic</span></h1>
          <h4 className='d-sm-block d-block d-md-none px-3'>Welcome<br /> to <span style={{color: '#DE8667'}}>Quotastic</span></h4>
          <h5 className='d-sm-none d-none d-md-block pb-4' style={{width: '530px'}}>
            Quotastic is free online platform for you to explore the  quips, quotes, and proverbs. Sign up and express yourself.
          </h5>
          <h5 className='d-sm-block d-block d-md-none px-3 pb-4'>
            Quotastic is free online platform for you to explore the  quips, quotes, and proverbs. Sign up and express yourself.
          </h5>
          <Link to='/register' className='btn rounded-pill px-5 shadow-sm mx-3 mx-md-0' style={{backgroundColor: '#DE8667', color: 'white'}}>Sign up</Link>
          </div>
          </div>
          <div className='d-flex d-lg-block flex-column align-items-center pb-5'>
            <img src={require('../assets/Landing_page_image.png')} alt="" />
          </div>
        </div>
        <div className='container-fluid text-center'>
          <div className='d-sm-none d-none d-md-block'>
          <h2>
          Explore the world of<br />
          <span style={{color: '#DE8667'}} >fantastic quotes</span>
          </h2>
          </div>
          <div className='d-sm-block d-block d-md-none'>
            <h4>Explore the world of fantastic quotes</h4>
          </div>
        </div>
        <div className='d-sm-none d-none d-md-block' style={{height: '125px'}} />
        <div className='d-sm-block d-block d-md-none' style={{height: '56px'}} />
        <Upvoted_quotes page={1} />
        <div className='d-flex justify-content-center'>
        <Link to='/register' className='btn border-2 rounded-pill ms-4 px-3 shadow-sm' style={{borderColor: '#EFB467', color: '#EFB467'}}>Sign up to see more</Link>
        </div>
        <div style={{height: '125px'}} />
      <Footer />
    </div>
  )
}

export default Home
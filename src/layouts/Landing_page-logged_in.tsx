import React, { useState } from 'react'
import RandomQuote from '../helpers/RandomQuote'
import UpvotedQuotes from '../helpers/UpvotedQuotes'
import RescentQuotes from '../helpers/RescentQuotes'


function Landing_page_logged_in() {

    const [likedPage, setLikedPage] = useState(1)
    const [rescentPage, setRescentPage] = useState(1)

    const handleLikedLoadMore = () => {
        setLikedPage(likedPage+1)
    }
    
    const handleRescentLoadMore = () => {
        setRescentPage(rescentPage+1)
        console.log();
    }

  return (
    <>
    <RandomQuote />
    <div className='py-md-5 py-2' />
    <UpvotedQuotes key={'liked'}  page={likedPage} />
    <div className='d-flex justify-content-center'>
    <button onClick={handleLikedLoadMore} className='btn border-2 rounded-pill ms-4 px-3 shadow-sm' style={{borderColor: '#EFB467', color: '#EFB467'}}>
        Load more
    </button>
    </div>
    <div className='py-5' />
    <RescentQuotes key={'rescent'} page={rescentPage} />
    <div className='d-flex justify-content-center'>
    <button onClick={handleRescentLoadMore} className='btn border-2 rounded-pill ms-4 px-3 shadow-sm' style={{borderColor: '#EFB467', color: '#EFB467'}}>
        Load more
    </button>
    </div>
    <div className='py-5' />
    </>
  )
}

export default Landing_page_logged_in
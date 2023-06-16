import { useEffect, useState } from 'react'
import Footer from '../layouts/Footer'
import Navbar from '../layouts/Navbar'
import Landing_page from '../layouts/Landing_page'
import Cookies from 'js-cookie'
import Landing_page_logged_in from '../layouts/Landing_page-logged_in'

function Home() {

  const [userSigneIn, setUserSigneIn] = useState(false)
  
  useEffect(() => {
    const user_cookie = Cookies.get('user_info')
    
    if (user_cookie) {
      setUserSigneIn(true)
    } else {
      setUserSigneIn(false)
    }

  }, [])
  
  return (
    <div>
      <Navbar />
        {
        userSigneIn ?
        <Landing_page_logged_in />
        :
        <Landing_page />
        }
      <Footer />
    </div>
  )
}

export default Home
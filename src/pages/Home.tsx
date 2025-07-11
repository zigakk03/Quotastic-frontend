import { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
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
            // eslint-disable-next-line react/jsx-pascal-case
        <Landing_page_logged_in />
        :
            // eslint-disable-next-line react/jsx-pascal-case
        <Landing_page />
        }
      <Footer />
    </div>
  )
}

export default Home
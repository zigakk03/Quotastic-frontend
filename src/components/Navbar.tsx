/* eslint-disable */
import Axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CreateQuote from "./CreateQuote";
import ProfileSettings from "./ProfileSettings";

function Navbar() {
  const [userUrl, setUserUrl] = useState("")
  const [userSigneIn, setUserSigneIn] = useState(false)
  const [avatar, setAvatar] = useState('')
  const [isImage, setIsImage] = useState(false)
  const [username, setUsername] = useState('')
  const [logoutError, setLogoutError] = useState(false)
  const [showMakeQuote, setShowMakeQuote] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  //make quote
  const openMakeQuote = () => {
    setShowMakeQuote(true)
  }

  const closeMakeQuote = () => {
    setShowMakeQuote(false);
    setTimeout(() =>{
      window.location.reload();
    },10)
  }
  const cancelMakeQuote = () => {
    setShowMakeQuote(false);
  }

  //userSettings
  const openSettings = () => {
    setShowSettings(true)
  }

  const closeSettings = () => {
    setShowSettings(false);
    setTimeout(() =>{
      window.location.reload();
    },10)
  }
  const cancelSettings = () => {
    setShowSettings(false);
  }


  const logoutUser = async () => {
    try {
      await Axios.post(
        'http://localhost:8080/signout',
        undefined,
        {withCredentials: true}
      )
      Cookies.remove('user_info')
      window.location.reload()
    } catch (error) {
      setLogoutError(true)
      setTimeout(() => {
        const cookies = Object.keys(Cookies.get());
        cookies.forEach((cookie) => {
        Cookies.remove(cookie);})
        setLogoutError(false);
        window.location.reload();
      }, 2000);
    }
  }

  useEffect(() => {
    const user_cookie = Cookies.get('user_info')
    
    if (user_cookie) {
      setUserSigneIn(true)

      const first_name = JSON.parse(user_cookie).first_name
      const last_name = JSON.parse(user_cookie).last_name
      setUserUrl( `/user/${JSON.parse(user_cookie).id}`)

      if (first_name === '' || first_name === null || last_name === '' || last_name === null) {
        setUsername(JSON.parse(user_cookie).email)
      } else {
        setUsername(`${first_name} ${last_name}`)
      }

      const avatar = JSON.parse(user_cookie).avatar
      if (avatar !== null) {
        const img = new Image();
        img.src = `http://localhost:8080/files/${avatar}`;
    
        img.onload = () => {
          setIsImage(true);
          setAvatar(`http://localhost:8080/files/${avatar}`);
        };
    
        img.onerror = () => {
          setIsImage(false);
        };
      }
    } else {
      setUserSigneIn(false)
    }
  }, [])
  

  // noinspection JSRemoveUnnecessaryParentheses
  return (
    <>
    {
      logoutError ? 
      <div className="alert alert-danger" role="alert">
        Something went wrong! Try reloading the page.
      </div>
      :
      <></>
    }

      <CreateQuote show={showMakeQuote} onClose={closeMakeQuote} onCancel={cancelMakeQuote} />
      <ProfileSettings show={showSettings} onClose={closeSettings} onCancel={cancelSettings} />

{/* other devices */}
    <div className="d-none d-md-block">
      <nav className="navbar navbar-expand px-5">
        <div className="container-fluid">
          <Link to='/' className="navbar-brand">
            <img src={require('../assets/Logo.png')} alt="Quotastic" />
          </Link>
          <div className="navbar" id="navbarNav">
            <ul className="navbar-nav">
              {userSigneIn 
              ?
              <>
                <li className="nav-item pt-2">
                  <Link to='/' className='me-3' style={{textDecoration: 'none', color: '#DE8667'}}>Home</Link>
                </li>
                <li className="nav-item pt-2">
                  <a href="#" onClick={openSettings} className='me-3' style={{textDecoration: 'none', color: '#DE8667'}}>Settings</a>
                </li>
                <li className="nav-item pt-2">
                  <Link to='/' onClick={logoutUser} className='me-4' style={{textDecoration: 'none', color: '#DE8667'}}>Logout</Link>
                </li>
                <li className="nav-item">
                  <Link to={userUrl} >
                  {
                  isImage ?
                  <img src={avatar} alt="Avatar" className='rounded-circle me-1' style={{width: '40px', height: '40px'}} />
                  :
                  <img src={require('../assets/No_profile_picture.png')} alt="Avatar" className='rounded-circle me-1' style={{width: '40px', height: '40px'}} />
                  }
                  </Link>
                </li>
                <li className="nav-item">
                  <a onClick={openMakeQuote} href='#'>
                    <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                  <path color='#DE8667' d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                    </div>
                  </a>
                </li>
              </>
              :
              <>
                <li className="nav-item">
                  <Link to='/register' className='btn rounded-pill px-5 shadow-sm' style={{backgroundColor: '#DE8667', color: 'white'}}>Sign up</Link>
                </li>
                <li className="nav-item">
                  <Link to='/login' className='btn border-2 rounded-pill ms-4 px-5 shadow-sm' style={{borderColor: '#EFB467', color: '#EFB467'}}>Login</Link>
                </li>
              </>
              }
            </ul>
          </div>
        </div>
      </nav>
    </div>







    {/* small devices */}
    <div className="d-block d-md-none">
      <nav className="navbar shadow-sm py-4 px-3">
        <div className="container-fluid">
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
              <path fillRule="evenodd" color='#DE8667' d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
            </svg>
          </button>
          <Link to='/' className="navbar-brand">
            <img src={require('../assets/Logo.png')} alt="Quotastic" />
          </Link>
          <div
            className="offcanvas offcanvas-start"
            tabIndex={-1}
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <button
                type="button"
                className="btn"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                  <path fill='#DE8667' d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                {userSigneIn
                ?
                <>
                  <li className="nav-item d-flex conainer-fluid ps-4 mb-4">
                  {
                    isImage ?
                    <img src={avatar} alt="Avatar" className='rounded-circle me-4' style={{width: '40px', height: '40px'}} />
                    :
                    <img src={require('../assets/No_profile_picture.png')} alt="Avatar" className='rounded-circle me-4' style={{width: '40px', height: '40px'}} />
                  }
                  <h5 className='pt-1'>{username}</h5>
                  </li>

                  <li className="nav-item mb-4">
                  <Link to='/' style={{textDecoration: 'none', color: 'black'}}>
                  <div
                    className="d-flex justify-content-between align-items-center ms-4"
                  >
                    <h5 className='pt-1'>
                      Home
                    </h5>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-chevron-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        stroke="black"
                        strokeWidth="1"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  </div>
                  </Link>
                </li>

                <li className="nav-item mb-4">
                  <Link to='/' style={{textDecoration: 'none', color: 'black'}}>
                  <div
                    className="d-flex justify-content-between align-items-center ms-4"
                  >
                    <h5 className='pt-1'>
                      Settings
                    </h5>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-chevron-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        stroke="black"
                        strokeWidth="1"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  </div>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to='/' onClick={logoutUser} style={{textDecoration: 'none', color: 'black'}}>
                  <div
                    className="d-flex justify-content-between align-items-center ms-4"
                  >
                    <h5 className='pt-1' style={{color: '#DE8667'}}>
                      Logout
                    </h5>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-chevron-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        stroke="#DE8667"
                        strokeWidth="1"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  </div>
                  </Link>
                </li>
                </>
                :
                <>
                <li className="nav-item">
                  <Link to='/' style={{textDecoration: 'none', color: 'black'}}>
                  <div
                    className="d-flex justify-content-between align-items-center"
                  >
                    <h5 className='pt-1'>
                      Home
                    </h5>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-chevron-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        stroke="black"
                        strokeWidth="1"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  </div>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to='/register' className='btn rounded-pill container-fluid mt-4' style={{backgroundColor: '#DE8667', color: 'white'}}>Sign up</Link>
                </li>
                <li className="nav-item">
                  <Link to='/login' className='btn border-2 rounded-pill container-fluid mt-3' style={{borderColor: '#EFB467', color: '#EFB467'}}>Login</Link>
                </li>
                </>
                }
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>

    </>
  )
}

export default Navbar
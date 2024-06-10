import  axios  from 'axios'
import Cookies from 'js-cookie'
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import CreateQuote from "./CreateQuote";

function Navbar_user_page(props: any) {

    const userUrl = `/user/${props.userId}`;
    const [showMakeQuote, setShowMakeQuote] = useState(false);
    const [avatarLink, setAvatarLink] = useState('');
    const [avatarIsImage, setAvatarIsImage] = useState(false);

    const openMakeQuote = () => {
        setShowMakeQuote(true)
    }

    const closeMakeQuote = () => {
        setShowMakeQuote(false);
        setTimeout(() => {
            window.location.reload();
        }, 10);
    }

    const logoutUser = async () => {
        try {
          await axios.post(
            'http://localhost:8080/signout',
            undefined,
            {withCredentials: true}
          )
          Cookies.remove('user_info')
          window.location.reload()
        } catch (error) {
            const cookies = Object.keys(Cookies.get());
            cookies.forEach((cookie) => {
            Cookies.remove(cookie);})
            window.location.reload();
        }
      }

    useEffect(() => {
        const userInfo = Cookies.get('user_info');
        if (userInfo) {
            try {
                const user = JSON.parse(userInfo);
                if (user.avatar === null){
                    setAvatarIsImage(false);
                } else {
                    setAvatarLink(`http://localhost:8080/files/${user.avatar}`);
                    setAvatarIsImage(true);
                }
            } catch (error) {
                setAvatarIsImage(false);
            }
        } else {
            setAvatarIsImage(false);
        }
    },[])

  return (
    <div className='container-fluid pt-md-3 p-0' style={{minHeight: '88px'}}>
            <div className="d-none d-md-block">
                <nav className="navbar navbar-expand px-5">
                    <div className="container-fluid">
                    <Link to='/' className="navbar-brand">
                        <img src={require('../assets/Logo_white.png')} alt="Quotastic" />
                    </Link>
                    <div className="navbar" id="navbarNav">
                        <ul className="navbar-nav">
                        <li className="nav-item pt-2">
                            <Link to='/' className='me-3' style={{textDecoration: 'none', color: 'white'}}>Home</Link>
                        </li>
                        <li className="nav-item pt-2">
                            <Link to='/' className='me-3' style={{textDecoration: 'none', color: 'white'}}>Settings</Link>
                        </li>
                        <li className="nav-item pt-2">
                            <Link to='/' onClick={logoutUser} className='me-4' style={{textDecoration: 'none', color: 'white'}}>Logout</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={userUrl} >
                        {
                        avatarIsImage ?
                        <img src={avatarLink} alt="Avatar" className='rounded-circle me-1' style={{width: '40px', height: '40px'}} />
                        :
                        <img src={require('../assets/No_profile_picture.png')} alt="Avatar" className='rounded-circle me-1' style={{width: '40px', height: '40px'}} />
                        }
                            </Link>
                        </li>
                        <li className="nav-item ps-3">
                            <img onClick={openMakeQuote} src={require('../assets/White_plus.png')} alt="Avatar" className='rounded-circle me-1' style={{width: '40px', height: '40px'}} />
                        </li>
                        </ul>
                    </div>
                    </div>
                </nav>
                <CreateQuote show={showMakeQuote} onClose={closeMakeQuote} />
                </div>

                {/* small devices */}
                <div className="d-block d-md-none" style={{backgroundColor: 'white'}}>
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

                        <li className="nav-item d-flex conainer-fluid ps-4 mb-4">
                            {
                                props.isImage ?
                                <img src={props.avatar} alt="Avatar" className='rounded-circle me-4' style={{width: '40px', height: '40px'}} />
                                :
                                <img src={require('../assets/No_profile_picture.png')} alt="Avatar" className='rounded-circle me-4' style={{width: '40px', height: '40px'}} />
                            }
                            <h5 className='pt-1'>{props.username}</h5>
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

                        </ul>
                        </div>
                    </div>
                    </div>
                </nav>
                </div>
    </div>
  )
}

export default Navbar_user_page
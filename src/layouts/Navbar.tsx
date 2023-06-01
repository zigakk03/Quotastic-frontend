import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <>

{/* other devices */}
    <div className="d-none d-md-block">
      <nav className="navbar navbar-expand px-5">
        <div className="container-fluid">
          <Link to='/' className="navbar-brand">
            <img src={require('../assets/Logo.png')} alt="Quotastic" />
          </Link>
          <div className="navbar" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to='/register' className='btn rounded-pill px-5 shadow' style={{backgroundColor: '#DE8667', color: 'white'}}>Sign up</Link>
              </li>
              <li className="nav-item">
                <Link to='/login' className='btn border-2 rounded-pill ms-4 px-5 shadow' style={{borderColor: '#EFB467', color: '#EFB467'}}>Login</Link>
              </li>
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
              <path fill-rule="evenodd" color='#DE8667' d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
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
                        fill-rule="evenodd"
                        stroke="black"
                        stroke-width="1"
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
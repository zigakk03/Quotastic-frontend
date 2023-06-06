import { useState } from 'react';
import Footer from '../layouts/Footer';
import NavbarLogin from '../layouts/Navbar-login';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios'
import {setGlobalState} from '../containers/userInfo'

function Login() {
  
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [authErr, setAuthErr] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setAuthErr(false);

    try {
      await Axios.post(
        'http://localhost:8080/login', 
        {email: email, password: pass},
        {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      }).then((response) => {
        setGlobalState('id', response.data.id)
        setGlobalState('first_name', response.data.first_name)
        setGlobalState('last_name', response.data.last_name)
        setGlobalState('email', response.data.email)
        setGlobalState('avatar', response.data.avatar)
      })

      navigate('/', {replace: true})
    } catch (error) {
      setAuthErr(true);
    }
  }


  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <NavbarLogin />
      <div className="container-fluid flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        <div className='px-5'>
          <h4 className="text-center">Welcome <span style={{color: '#DE8667'}}>back!</span></h4>
          <p className="text-center">Thank you for coming back. Hope you have a good day and inspire others.</p>
          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label small">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='example@net.com' className="form-control px-4 rounded-pill border-2" id="exampleInputEmail1" aria-describedby="emailHelp" style={{borderColor: '#EFB467'}} />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label small">Password</label>
              <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder='···········' className="form-control px-4 rounded-pill border-2" id="exampleInputPassword1" style={{borderColor: '#EFB467'}} />
            </div>

            <button type="submit" className="btn border-2 rounded-pill px-5 shadow-sm container-fluid" style={{borderColor: '#EFB467', color: '#EFB467'}}>Login</button>
          </form>
          {authErr && <p className="text-danger text-center">Authentication failed. Please check your credentials.</p>}
          <div className='container-fluid d-flex justify-content-between pt-3' style={{padding: 0, margin: 0}}>
            <p>Dont have an account?</p>
            <Link to='/register' style={{textDecoration: 'none', color: '#EFB467'}}>Sign up</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;

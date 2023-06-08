import NavbarRegister from '../layouts/Navbar-register';
import Footer from '../layouts/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';

function Register() {
  const [authErr, setAuthErr] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('')

  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordRequirementsMet, setPasswordRequirementsMet] = useState(true);
  const [requirementsFail, setReqirementsFail] = useState(false);

  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement | null>(null);


  const handleFileChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.files) {
      const file = target.files[0]
      setFile(file)      
    }
  }

  const handlePasswordChange = (e: any) => {
    const value = e.target.value;
    setPass(value)
    if (value !== '' || value !== null) { 
      setPasswordsMatch(value === confirmPass);
      setPasswordRequirementsMet(/^(?=.*\d)(?=.*[A-Za-z])[A-Za-z\d\s~@#$%^&*+=`|{}:;"'<>?!,./[\]-]{9,}$/.test(value));
    }
  }

  const handleConfirmPasswordChange = (e: any) => {
    const value = e.target.value;
    setConfirmPass(value)
    setPasswordsMatch(value === pass);
  }

  const handleImgClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (passwordsMatch && passwordRequirementsMet) {
      try {
        await Axios.post(
            'http://localhost:8080/signup',
            {
              first_name: firstName,
              last_name: lastName,
              email: email,
              password: pass,
              confirm_password: confirmPass,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            }
          )

        await Axios.post(
            'http://localhost:8080/login', 
            {email: email, password: pass},
            {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
          }).then((response) => {
            const user = {
              id: response.data.id,
              first_name: response.data.first_name,
              last_name: response.data.last_name,
              email: response.data.email,
              avatar: response.data.avatar,
            }
    
            Cookies.set('user_info', JSON.stringify(user))
          })
          
        if (file !== null) {
          const formData = new FormData()
          formData.append('avatar', file, file.name)
          await Axios.post(
            'http://localhost:8080/me/upload',
            formData,
            {withCredentials: true}
          )
        }
          
        navigate('/', {replace: true})
      } catch (error) {
        setAuthErr(true);
        setTimeout(() => {
          setAuthErr(false);
        }, 5000);

        console.log(error);
      }
    } else {
      setReqirementsFail(true)
      setTimeout(() => {
        setReqirementsFail(false);
      }, 5000);
    }
  }

  useEffect(() => {
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }
  }, [file])

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <NavbarRegister />
      <div className="container-fluid flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        <div className='px-5'>
          <h4 className="text-center">What is your <span style={{color: '#DE8667'}}>name?</span></h4>
          <p className="text-center">Your name will appear on quotes and your public profle.</p>
          <form onSubmit={handleSubmit}>

            <div className="d-flex justify-content-center">
              <img onClick={handleImgClick} src={preview === null ? require('../assets/No_profile_picture.png') : preview} alt="Avatar" className='rounded-circle' style={{width: 64, height: 64}} />
              <input
              onChange={handleFileChange}
              id="avatar"
              name="avatar"
              type="file"
              ref={fileInputRef}
              aria-label="Avatar"
              aria-describedby="avatar"
              className="d-none"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail" className="form-label small">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='example@net.com' className="form-control px-4 rounded-pill border-2" id="exampleInputEmail1" aria-describedby="emailHelp" style={{borderColor: '#EFB467'}} />
            </div>

            <div className='d-flex'>
              <div className="container-fluid mb-3" style={{paddingLeft: '0'}} >
                <label htmlFor="exampleInputFirstName" className="form-label small">First Name</label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='John' className="form-control px-4 rounded-pill border-2" id="exampleInputEmail1" aria-describedby="emailHelp" style={{borderColor: '#EFB467'}} />
              </div>
              <div className="container-fluid mb-3"style={{paddingRight: '0'}} >
                <label htmlFor="exampleInputLastName" className="form-label small">Last Name</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Scott' className="form-control px-4 rounded-pill border-2" id="exampleInputEmail1" aria-describedby="emailHelp" style={{borderColor: '#EFB467'}} />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputPassword" className="form-label small">Password</label>
              <input type="password" value={pass} onChange={handlePasswordChange} placeholder='···········' className="form-control px-4 rounded-pill border-2" id="exampleInputPassword1" style={{borderColor: '#EFB467'}} />
              {!passwordRequirementsMet && <p className='text-danger text-center'>Password must have at least one number, one letter, and it has to be longer than 8 characters.</p>}
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputConfirmPassword" className="form-label small">Confirm password</label>
              <input type="password" value={confirmPass} onChange={handleConfirmPasswordChange} placeholder='···········' className="form-control px-4 rounded-pill border-2" id="exampleInputPassword1" style={{borderColor: '#EFB467'}} />
              {!passwordsMatch && <p className='text-danger text-center'>Passwords don't match!</p>}
            </div>

            <button type="submit" className="btn border-2 rounded-pill px-5 shadow-sm container-fluid" style={{backgroundColor: '#DE8667', color: 'white'}}>Sign up</button>
          </form>
          {authErr && <p className="text-danger text-center">Something is wrong. Please check your credentials.</p>}
          {requirementsFail && <p className="text-danger text-center">Passwords don't meet the requirements.</p>}
          <div className='container-fluid d-flex justify-content-between pt-3' style={{padding: 0, margin: 0}}>
            <p>Already have an account?</p>
            <Link to='/login' style={{textDecoration: 'none', color: '#EFB467'}}>Sign in</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register
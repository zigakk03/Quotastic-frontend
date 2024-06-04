import { Link } from "react-router-dom"

function Footer() {
  return (
    <div className='container-fluid d-flex justify-content-between align-items-center text-white px-5' style={{height: 56, backgroundColor: '#DE8667'}}>
        <Link to='/'><img src={require('../assets/Logo_icon.png')} alt="logo" /></Link>
        <p className='my-auto'>All Rights Reserved | skillupmentor.com</p>
    </div>
  )
}

export default Footer
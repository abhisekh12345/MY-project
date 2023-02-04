import logo  from '../assets/images/logo.svg';
import React from 'react'

const Logo = () => {
  return (
    <div>
        <img src={logo} alt='job' className='logo' />
    </div>
  )
}

export default Logo
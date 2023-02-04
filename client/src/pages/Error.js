import React from 'react'
import {Link} from 'react-router-dom';
import img from "../assets/images/not-found.svg"
import Wrapper from '../assets/wrappers/ErrorPage';


const Error = () => {
  return (
    <Wrapper className='full-page'>
        <div>
            <img src={img} alt='not found'></img>
            <h1>Oh! page not found </h1>
            <p>We can't seem to find the page that are you looking for</p>
            <Link to="/">Back Home</Link>
        </div>
    </Wrapper>
  )
}

export default Error
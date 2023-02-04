
import Wrapper from '../assets/wrappers/RegisterPage'
import { useState,useEffect } from 'react'
import { Logo,FormRow,Alert } from '../component'
import { useAppContext } from '../context/AppContext'
import {useNavigate} from 'react-router-dom'

const initialState ={
  name : '',
  email : '',
  password : '',
  isMember : true
}

const Register = () => {
   
  const navigate = useNavigate();

  const[values,setValues] = useState(initialState)



  const{user,showAlert,isLoading,displayAlert,setupUser} = useAppContext();
  

  const toogleMember = () =>{
    setValues({...values,isMember : !values.isMember})
  }
  
  const handleChange = (e) =>{
    setValues({...values, [e.target.name] : e.target.value})
  }

  const onSubmit = (e) =>{
    e.preventDefault()
   const {email,password,name,isMember} = values;
   if(!email || !password || (!isMember && !name) ){
    displayAlert()
    return
   }
   const currentUser = {name,email,password}
   if(isMember){
    setupUser({
      currentUser,
      endPoint: 'login',
      alertText: 'Login Successful! Redirecting...',
    });
   }else{
    setupUser({
      currentUser,
      endPoint: 'register',
      alertText: 'User Created! Redirecting...',
    });
   }
  //  console.log(values)
  }
  
  useEffect(() =>{
   if(user){
      setTimeout(()=>{
        navigate('/')
      },3000)
   }
  },[user,navigate])


  return (
   <Wrapper className='full-page'>
   <form className='form' onSubmit={onSubmit}>
    <Logo />
    <h3>{values.isMember ? "Login" : "Register"}</h3>
    {showAlert && <Alert />} 
    {/* name input */}
    {!values.isMember && (
      <FormRow 
    input="text"
    name="name"
    value={values.name}
    handleChange ={handleChange}
    />
    )}
    
        
    {/* email input */}
    <FormRow 
    input="email"
    name="email"
    value={values.email}
    handleChange ={handleChange}
    />


    {/* password input */}
    <FormRow 
    input="password"
    name="password"
    value={values.password}
    handleChange ={handleChange}
    />

        <button type='submit' className='btn btn-block' disabled={isLoading}>submit</button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member"}
          <button type='button' onClick={toogleMember} className='member-btn'>{values.isMember ? "Register" : "Login"}</button>
        </p>
    </form>
   </Wrapper>
  )
}

export default Register
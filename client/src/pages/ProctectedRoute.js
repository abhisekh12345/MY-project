import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const ProctectedRoute = ({children}) => {
    const {user} = useAppContext()
    if(!user){
        return <Navigate to= '/landing' />
    }
   
  return children
}

export default ProctectedRoute
import React, { useReducer } from 'react'
import { useContext } from 'react'
import reducer from './reducer'
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDEL_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOB_BEGIN,
  GET_JOB_SUCCESS,
  SET_EDIT_JOB,
  DELETE_JOB_BEGIN,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE
} from './action'

import axios from "axios"

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userlocation = localStorage.getItem('userlocation')

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  userlocation: userlocation || '',
  showSidebar: false,
  isEditing: false,
  editJobId: "",
  position: '',
  company: '',
  joblocation: userlocation || "",
  jobTypeOption: ['full-time', 'part-time', 'remote', 'intership'],
  jobType: 'full-time',
  statusOptions: ['interview', 'decliend', 'pending'],
  status: 'pending',
  jobs: [],
  totalJobs: 0,
  numberofPages: 1,
  page: 1,
  stats : {},
  monthlyApplication : [],
  search : '',
  searchStatus: 'all',
  searchType : 'all',
  sort : 'latest',
  sortOptions : ['latest','oldest','a-z','z-a']
}








const AppContext = React.createContext()

const AppProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  //axios
  const authFetch = axios.create({
    baseURL: '/api/v1',
  });

  //  request interceptor
  authFetch.interceptors.request.use(
    (config) => {
      config.headers['Authorization'] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );



  // response interceptor
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error.response);
      if (error.response.status === 401) {
        logoutUser()
      }
      return Promise.reject(error);
    }
  );








  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT
      })
    }, 3000);
  }


  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    localStorage.setItem('location', location)

  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('location')

  }

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );

      const { user, location, token } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, location, alertText, token },
      });
      addUserToLocalStorage({ user, token, location })
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const toogleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR })
  }


  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER })
    removeUserFromLocalStorage()
  }

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser);
      const { user, location, token } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token },
      });
      addUserToLocalStorage({ user, location, token })
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();


  }

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDEL_CHANGE, payload: { name, value } })
  }


  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES })
  }


  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN })
    try {
      const { position, company, joblocation, jobType, status } = state
      await authFetch.post('/jobs', {
        company,
        position,
        joblocation,
        jobType,
        status
      })

      dispatch({ type: CREATE_JOB_SUCCESS })
      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: error.response.data.msg }
      })

    }

    clearAlert()
  }

  const getJobs = async () => {
    const{page,search,searchType,searchStatus,sort} =state
    let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`
    if(search){
       url = url + `&search=${search}`
    }
    dispatch({ type: GET_JOB_BEGIN })
    try {
      const { data } = await authFetch(url)
      const { jobs, totalJobs, numOfPages } = data
      dispatch({
        type: GET_JOB_SUCCESS,
        payload: {
          jobs,
          totalJobs,
          numOfPages
        }
      })
    } catch (error) {
      logoutUser()
    }
    clearAlert()
  }


  const setEditJob = (id) => {
    dispatch({ type: SET_EDIT_JOB, payload: { id } })
  }


  const editJob = async () => {
    dispatch({ type: EDIT_JOB_BEGIN })
    try {
      const { company, position, joblocation, jobType, status } = state
      await authFetch.patch(`/jobs/${state.editJobId}`, {
        company,
        position,
        joblocation,
        jobType,
        status
      })
      dispatch({ type: EDIT_JOB_SUCCESS })
      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({ type: EDIT_JOB_ERROR, payload: { msg: error.response.data.msg } })
    }
    clearAlert()
  }

  const deleteJob = async (jobId) => {
    dispatch({ type: DELETE_JOB_BEGIN })
    try {
      await authFetch.delete(`/jobs/${jobId}`)
      getJobs()
    } catch (error) {
      logoutUser()
    }
  }
   

  const showStats = async () =>{
    dispatch({type : SHOW_STATS_BEGIN})
    try {
        const {data} = await authFetch('/jobs/stats')
        dispatch({type : SHOW_STATS_SUCCESS,
        payload : {
          stats : data.defaultStats,
          monthlyApplication : data.monthlyApplication
        }
        })
    } catch (error) {
      logoutUser()
    }
    clearAlert()
  }

  
  const clearFilters = () =>{
    dispatch({type : CLEAR_FILTERS})
  }

  const changePage = (page) =>{
    dispatch({type : CHANGE_PAGE,payload : {page}})
  }


  return (
    <AppContext.Provider value={{
      ...state,
      displayAlert,
      setupUser,
      toogleSidebar,
      logoutUser,
      updateUser,
      handleChange,
      clearValues,
      createJob,
      getJobs,
      setEditJob,
      deleteJob,
      editJob,
      showStats,
      clearFilters,
      changePage
    }}>{children}</AppContext.Provider>
  )
}





const useAppContext = () => {
  return useContext(AppContext)
}

export { initialState, AppProvider, useAppContext }
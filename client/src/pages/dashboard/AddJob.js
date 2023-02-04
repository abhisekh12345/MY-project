import {FormRow,FormRowSelect ,Alert} from '../../component/index'
import { useAppContext } from '../../context/AppContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'



const AddJob = () => {
 const {
  isLoading,
  isEditing,
  showAlert,
  displayAlert,
  position,
  company,
  joblocation,
  jobType,
  jobTypeOption,
  status,
  statusOptions,
  handleChange,
  clearValues,
  createJob,
  editJob
 }= useAppContext()


const handleSubmit =(e) =>{
  e.preventDefault()

  if(!position || !company || !joblocation){
    displayAlert()
    return
  }
  if(isEditing){
    editJob()
    return
  }
  createJob()
}

 const handleJobInput = (e) =>{
  const name = e.target.name
  const value = e.target.value
  console.log(`${name} : ${value}`);
  handleChange({name,value})
 }

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>
        {showAlert && <Alert />}
        <div className='form-center'>

       {/* position */}
          <FormRow 
          type= 'text' 
          name='position' 
          value={position}
          handleChange = {handleJobInput}
           />

           {/* company */}
          <FormRow 
          type= 'text' 
          name='company' 
          value={company}
          handleChange = {handleJobInput}
           />

          {/* location */}
         <FormRow
          type= 'text' 
          labelText='Job location'
          name='joblocation' 
          value={joblocation}
          handleChange = {handleJobInput}
           />
      
           {/*job status */}
            <FormRowSelect
            name='status'
            value={status}
            handleChange={handleJobInput}
            list = {statusOptions}
            />



           {/*job type */}
           <FormRowSelect
            name='jobType'
            labelText="job type"
            value={jobType}
            handleChange={handleJobInput}
            list = {jobTypeOption}
            />



           <div className='btn-container'>
            <button type='submit' className='btn btn-block sbmit-btn' onClick={handleSubmit} disabled={isLoading}>
              sumbit
            </button>

              <button className='btn btn-block clear-btn' onClick={(e) =>{
               e.preventDefault()
               clearValues() 
              }}>
                clear
              </button>

           </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob
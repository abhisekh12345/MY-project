import Wrapper from '../assets/wrappers/SmallSidebar'
import { FaTimes } from 'react-icons/fa'
import { useAppContext } from '../context/AppContext'
import Logo from './Logo'
import NavLinks from './NavLinks'


const SmallSidebar = () => {
  const { showSidebar, toogleSidebar } = useAppContext()
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }
      >
        <div className='content'>
          <button type='button' className='close-btn' onClick={toogleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toogleSidebar={toogleSidebar}/>
        </div>
      </div>
    </Wrapper>
  )
}

export default SmallSidebar
import Wrapper from "../assets/wrappers/BigSidebar"
import NavLinks from "./NavLinks"
import Logo from '../component/Logo'
import{useAppContext} from '../context/AppContext'

const BigSidebar = () => {
  const {showSidebar} =useAppContext()
  return (
         <Wrapper>
              <div 
              className={
                showSidebar ? 'sidebar-container ' : 'sidebar-container show-sidebar'
                }
                >
                  <div className="content">
                    <header>
                      <Logo />
                    </header>
                     <NavLinks />
                  </div>
                </div>
         </Wrapper>
  )
}

export default BigSidebar
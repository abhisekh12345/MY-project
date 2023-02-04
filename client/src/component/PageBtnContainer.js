import { useAppContext } from "../context/AppContext"
import {HiChevronDoubleLeft,HiChevronDoubleRight} from 'react-icons/hi'
import Wrapper from "../assets/wrappers/PageBtnContainer"

const PageBtnContainer = () => {
    const {numOfPages,page,changePage} = useAppContext()

   const pages = Array.from({length : numOfPages},(_,index) =>{
     return index +1
   })

    const prevPage = () =>{
       let newpage = page-1
       if(newpage<1){
        newpage = numOfPages
       }
       changePage(newpage)
    }

    const nextPage = () =>{
       let newpage = page + 1
       if(newpage > numOfPages){
        newpage = 1
       }
       changePage(newpage)
    }

  return (
    <Wrapper>
        <button className="prev-btn" onClick={prevPage}>
            <HiChevronDoubleLeft /> prev
        </button>

        <div className="btn-container" >
            {pages.map((pageNumber) =>{
                return <button
                type="button"
              className= {pageNumber === page ? 'pageBtn active' : 'pageBtn'}
              key= {pageNumber}
              onClick={() => changePage(pageNumber)}
              >
                {pageNumber}
              </button>
            })}
        </div>

        <button className="next-btn" onClick={nextPage}>
            next <HiChevronDoubleRight />
        </button>
    </Wrapper>
  )
}

export default PageBtnContainer
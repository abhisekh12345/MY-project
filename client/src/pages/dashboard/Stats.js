import { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { StatsContainer ,Loading ,ChartsContainer} from "../../component/index";

const Stats = () => {
  const {showStats,isLoading,monthlyApplication} = useAppContext()
 
  useEffect(() => {
    showStats()
  }, [])
  
 if(isLoading){
  return <Loading center />
 }

  return (
    <>
      <StatsContainer />
      {monthlyApplication.length > 0 && <ChartsContainer />}
    </>
  )
}

export default Stats;
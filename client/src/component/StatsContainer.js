import StateItem from "./StateItem"
import { useAppContext } from "../context/AppContext"
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa'
import Wrapper from "../assets/wrappers/StatsContainer"

const StatsContainer = () => {

  const { stats } = useAppContext()
  const defaultStats = [
    {
      title: "pending application",
      count: stats.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: '#e96949',
      bcg: '#fcefc7'
    },
    {
      title: "interview scheduled",
      count: stats.interview || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9'
    },
    {
      title: "jobs declined",
      count: stats.decliend || 0,
      icon: <FaCalendarCheck />,
      color: '#d66a6a',
      bcg: '#ffeeee'
    },
  ]

  return (

    <Wrapper>
      {defaultStats.map((item, index) => {
        return (
          <StateItem key={index} {...item}
          />
        )
      })}

    </Wrapper>
  )
}

export default StatsContainer
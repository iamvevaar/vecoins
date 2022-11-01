import "../styles/header.css"
import { Link, NavLink} from 'react-router-dom'

const Header = () => {

  return (
    <div className='header'>
      <div className='logo'>
    <Link to="/">VECOINS</Link>
      
      </div>
        <ul className='item' >
             <li> <NavLink to="/exchanges" activeclassname="active"> Exchanges  </NavLink> </li>
             <li> <NavLink to="/coins" activeclassname="active"> Coins </NavLink> </li>
        </ul>
    </div>
  )
}

export default Header
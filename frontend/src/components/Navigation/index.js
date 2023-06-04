import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
// import logo from './logo.png'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  
    return (
      <ul className='nav-ul'>
        <li>
          <NavLink exact to="/" id='logo-link'>
            {/* <img src={logo} alt='airbnb logo' className='logo-img' /> */}
            <i className="fa-brands fa-airbnb"></i>
            <h6>HaveFunBnb</h6>
          </NavLink>
        </li>
        <div id='login-user'>
          {(()=> {
            if(sessionUser) {
                return <NavLink to='/spots/new' id='creat-new-spot-link'>Create a New Spot</NavLink>
            }
          })()}
          {isLoaded && (
            <li>
              <ProfileButton user={sessionUser} />
            </li>
          )}
        </div>
      </ul>
      );
  }

  

export default Navigation;
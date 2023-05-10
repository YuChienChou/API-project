import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import Airbnb from './Airbnb-logo.jpg'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  console.log("session user: ", sessionUser);

  if(sessionUser) {
    return (
      <ul className='nav-ul'>
        <li>
          <NavLink exact to="/">
            <img src={Airbnb} alt='airbnb logo' className='logo-img' />
          </NavLink>
        </li>
        <div id='login-user'>
          <NavLink to='/spots/new' id='creat-new-spot-link'>
            Create a New Spot
          </NavLink>
          {isLoaded && (
            <li>
              <ProfileButton user={sessionUser} />
            </li>
          )}
        </div>
      </ul>
      );
    } else {
      return (
        <ul className='nav-ul'>
          <li>
            <NavLink exact to="/">
              <img src={Airbnb} alt='airbnb logo' className='logo-img' />
            </NavLink>
          </li>
          {isLoaded && (
            <li>
              <ProfileButton user={sessionUser} />
            </li>
          )}
        </ul>
        );
    }
  }

  

export default Navigation;
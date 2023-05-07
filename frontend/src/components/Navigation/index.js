// import React from "react";
// import { NavLink } from "react-router-dom";
// import { useSelector } from "react-redux";
// import ProfileButton from "./ProfileButton";
// import OpenModalButton from "../OpenModalButton";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";
// import "./Navigation.css";
// import Airbnb from './Airbnb-logo.jpg'



// function Navigation({ isLoaded }) {
//   const sessionUser = useSelector((state) => state.session.user);

//   let sessionLinks;
//   if (sessionUser) {
//     sessionLinks = (
//       <li className='profile-session'>
//         <ProfileButton user={sessionUser} />
//       </li>
//     );
//   } else {
//     sessionLinks = (
//         <li>
//           <OpenModalButton
//             buttonText="Log In"
//             modalComponent={<LoginFormModal />}
//             id='nav-link-button'
//           />
//           <OpenModalButton
//             buttonText="Sign Up"
//             modalComponent={<SignupFormModal />}
//             id='nav-link-button'
//           />
//         </li>
//     );
//   }

//   return (
//     <ul className='nav-ul'>
//       <li>
//         <NavLink exact to="/">
//         <img src={Airbnb} alt='Airbnb logo' className='logo-img' />
//         </NavLink>
//       </li>
//       {isLoaded && sessionLinks}
//     </ul>
//   );
// }

// export default Navigation;

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import Airbnb from './Airbnb-logo.jpg'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className='nav-ul'>
      <li>
        <NavLink exact to="/">
          <img src={Airbnb} className='logo-img' />
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

export default Navigation;
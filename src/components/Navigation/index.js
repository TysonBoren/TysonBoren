import React from 'react';
import { Link } from "react-router-dom";

import SignOutButton from "../SignOut";

import * as ROUTES from "../../constants/routes";
import { AuthUserContext } from "../Session";
import Logo from "../styles/images/logo.png"



const Navigation = () => (
  <div>
    <AuthUserContext.Consumer> 
      {authUser => 
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
)

const NavigationAuth = () => (
  <div className='nav-wrapper'>
    <div className='logo-wrapper'>
      <div className="logo">
        <img src={Logo} alt="banana-mechanic-logo"/>
      </div>
    </div>
    <ul className="nav-link-wrapper">
      <div>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </div>
      <div>
        <Link to={ROUTES.HOME}>Home</Link>
      </div>
      <div>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </div>
      {/* <li>
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </li> */}
      <div>
        <SignOutButton />
      </div>
    </ul>
  </div>
);


const NavigationNonAuth = () => (
  <div className='nav-wrapper'>
  <div className='logo-wrapper'>
      <div className="logo">
        <img src={Logo} alt="banana-mechanic-logo"/>
      </div>
    </div>
    <ul className='nav-link-wrapper'>
      {/* <li>
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </li> */}
      <div>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </div>
      <div>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </div>
    </ul>
  </div>
);

export default Navigation;

import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import UserContext from './UserContext';
import './styles/NavBar.css';

const NavBar = function({signout}){
    const {currUser} = useContext(UserContext);

    if(!currUser){
        return(
            <nav className="Navigation navbar navbar-expand-md">
                <NavLink className="navbar-brand ms-2" to={'/'}>Trivia Carp</NavLink>
                <nav className="navbar-nav ms-auto">
                    <NavLink className="nav-link" to={'/signup'}>Sign Up</NavLink>
                    <NavLink className="nav-link" to={'/login'}>Login</NavLink>
                </nav>
            </nav>
        )
    }

    return(
        <nav className="Navigation navbar navbar-expand-md">
            <NavLink className="navbar-brand mb-0 h1" to={'/'}>Trivia Carp</NavLink>
            <nav className="navbar-nav ms-auto">
                <NavLink className="nav-link" to={'/play'}>Play</NavLink>
                <NavLink className="nav-link" to={'/profile/edit'}>Edit Profile</NavLink>
                <NavLink className="nav-link" to={`/profile/${currUser.username}`} reloadDocument>View Profile</NavLink>
                <NavLink className="nav-link" to={'/users'}>Users</NavLink>
                <NavLink className="nav-link text-danger" to={'/signout'} onClick={signout}>Sign Out</NavLink>
            </nav>
        </nav>
        
    )
}

export default NavBar;
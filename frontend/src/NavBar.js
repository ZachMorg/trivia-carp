import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import UserContext from './UserContext';

const NavBar = function({signout}){
    const {currUser} = useContext(UserContext);

    if(!currUser){
        return(
            <nav>
                <NavLink to={'/'}>Trivia Carp</NavLink>
                <NavLink to={'/signup'}>Sign Up</NavLink>
                <NavLink to={'/login'}>Login</NavLink>
            </nav>
        )
    }

    return(
        <nav>
            <NavLink to={'/'}>Trivia Carp</NavLink>
            <NavLink to={'/play'}>Play</NavLink>
            <NavLink to={'/profile/edit'}>Edit Profile</NavLink>
            <NavLink to={`/profile/${currUser.username}`} reloadDocument>View Profile</NavLink>
            <NavLink to={'/users'}>Users</NavLink>
            <NavLink to={'/signout'} onClick={signout}>Sign Out</NavLink>
        </nav>
    )
}

export default NavBar;
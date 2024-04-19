import React, {useContext} from 'react';
import UserContext from './UserContext';
import { Link } from 'react-router-dom';
import './styles/Homepage.css';

const Homepage = function(){
    const {currUser} = useContext(UserContext);

    if(!currUser){
        return(
            <div className="outer-div">
                <div className="container text-center">
                    <h2>Welcome to Trivia Carp!</h2>
                    <h3>To continue, <Link to={'/login'}>login</Link> or <Link to={'/signup'}>create an account</Link></h3>
                </div>
            </div>
            
        )
    }

    return(
        <div className="outer-div">
            <div className="container text-center">
                <h2>Hello, {currUser.username}!</h2>
                <h3>Get started by <Link to={'/play'}>playing a game</Link>!</h3>
            </div>
        </div>
        
    )
}

export default Homepage;
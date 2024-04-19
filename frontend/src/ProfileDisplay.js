import React, {useState, useEffect, useContext} from 'react';
import TriviaCarpApi from './api';
import FriendList from './FriendList';
import UserContext from './UserContext';
import './styles/ProfileDisplay.css';

const ProfileDisplay = function({user}){

    const {currUser, removeFriend, addFriend} = useContext(UserContext); 

    const [games, setGames] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    let gamesHtml;
    let friendButton;

    useEffect(function getGames(){
        async function callApi(){
            let res = await TriviaCarpApi.getAllGames(user.username);
            console.log(res);
            setGames(res);
            setIsLoading(false);
        }
        callApi();
    },[user]);

    const addFriendHandler = function(){
        addFriend(user.username);
        window.location.reload();
    }

    const removeFriendHandler = function(){
        removeFriend(user.username);
        window.location.reload();
    }

    
    if(games.length > 0){
        gamesHtml = games.slice(0,5).map(g => (
            <div>
                <h5>{g.category} - {g.numCorrect}/{g.numQuestions}</h5>
            </div>
        ))
    }
    else{
        gamesHtml = 'No game data available';
    }

    
    if(currUser.friends.indexOf(user.username) !== -1){
        friendButton = <button onClick={removeFriendHandler}>Remove Friend</button>
    }
    else if(currUser.username !== user.username){
        friendButton = <button onClick={addFriendHandler}>Add Friend</button>
    }
    

    console.log(games);
    console.log(games.slice(0,5));
    console.log(user);

    if(isLoading){
        return(<h2>Loading...</h2>)
    }

    return (
        <div className="">
            <div className="d-flex justify-content-center">
                <h2>{user.username}</h2>
                {friendButton}
            </div>
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4 mt-5">
                <div className="card">
                    <h3>5 most recent games:</h3>
                    {gamesHtml}
                </div>
            </div>
            <br/>
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4 mt-5">
                <div className="card">
                    <h3>Friends:</h3>
                    <FriendList user={user}/>
                </div>
            </div>
        </div>
    )
}

export default ProfileDisplay;
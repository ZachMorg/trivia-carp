import NavBar from './NavBar';
import RouteList from './RouteList';
import TriviaCarpApi from './api';
import {jwtDecode} from 'jwt-decode';
import UserContext from './UserContext';
import React, {useEffect, useState} from 'react';
import useLocalStorage from './localStorage';

export const TOKEN = 'trivia-carp-token';

function App() {

  const [token, setToken] = useLocalStorage(TOKEN);
  const [currUser, setCurrUser] = useState({
    data: null,
    isLoading: true
  });

  useEffect(function loadUser(){
    async function getUserData(){
      if(token){
        console.log(`Token :${token}`);
        TriviaCarpApi.token = token;
        const {username} = jwtDecode(token);
        const apiUser = await TriviaCarpApi.getCurrUser(username)
        setCurrUser({
          data: apiUser,
          isLoading: false
        });
      }
      else{
        setCurrUser({
          data: null,
          isLoading: false
        })
      }
    }
    getUserData();
  },[token]);

  console.log(token);
  console.log(currUser);

  const login = async function(data){
    let token = await TriviaCarpApi.login(data);
    setToken(token);
  }

  const signup = async function(data){
    let token = await TriviaCarpApi.register(data);
    setToken(token);
  }

  const signout = async function(){
    setToken(null);
  }

  const getQuestions = async function(data){
    console.log(data);
    const res = await TriviaCarpApi.getQuestions(data);
    return res;
  }

  const saveGameResults = async function(data){
    await TriviaCarpApi.addGameResults({username: currUser.data.username, ...data});
  }

  const addFriend = async function(friendUsername){
    await TriviaCarpApi.addFriend(currUser.data.username, friendUsername);
    currUser.data.friends.push(friendUsername);
  }

  const removeFriend = async function(friendUsername){
    await TriviaCarpApi.removeFriend(currUser.data.username, friendUsername);
    let idx = currUser.data.friends.indexOf(friendUsername);
    currUser.data.friends.splice(idx, 1);
  }

  if(currUser.isLoading){
    return(<h2>Loading...</h2>);
  }

  return (
    <UserContext.Provider value={{currUser: currUser.data, setCurrUser, saveGameResults, getQuestions, addFriend, removeFriend}}>
      <div className="App">
        <NavBar signout={signout}/>
        <RouteList currUser={currUser.data} login={login} signup={signup}/>
      </div>
    </UserContext.Provider>
    
  );
}

export default App;

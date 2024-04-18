import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import ProfileDisplay from './ProfileDisplay';
import TriviaCarpApi from './api';


const FindUser = function(){
    const {username} = useParams();
    const [user, setUser] = useState(null);

    useEffect(function getUser(){
        async function callApi(){
            let res = await TriviaCarpApi.getCurrUser(username);
            setUser(res);
        }
        callApi();
    },[]);

    if(!user){
        return(<h2>Loading...</h2>);
    }

    return(
        <ProfileDisplay user={user}/>
    )
}

export default FindUser;
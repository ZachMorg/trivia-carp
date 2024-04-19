import React, {useState, useEffect} from "react";
import TriviaCarpApi from "./api";
import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";

const UserList = function(){

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(function getAllUsers(){
        async function callApi(){
            let res = await TriviaCarpApi.getUsers();
            console.log(res);
            setUsers(res);
            setIsLoading(false);
        }
        callApi();
    },[])

    const submitSearch = async function(search){
        setIsLoading(true);
        console.log(search);
        let res = await TriviaCarpApi.getUsers(search);
        console.log(res);
        setUsers(res); 
        setIsLoading(false);
    }

    console.log(users);

    if(isLoading){
        return(<h2>Loading...</h2>)
    }

    if(users.length === 0){
        return (<div>
                    <SearchForm submit={submitSearch}/>
                    <h2>No Users found</h2>
                </div>)
    }

    return(
        <div>
            <SearchForm submit={submitSearch}/>
            <br/>
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4 mt-5">
                <div className="card">
                    {users.map(u => (
                        <div className="card-body">
                            <Link to={`/profile/${u.username}`}>
                                <h3>{u.username}</h3>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default UserList;
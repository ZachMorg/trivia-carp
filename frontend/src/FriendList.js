import React, { useState } from "react";
import { Link } from "react-router-dom";

const FriendList = function({user}){

    const [friends, setFriends] = useState(user.friends);

    console.log(friends);

    if(friends.length === 0){
        return(
            <div>
                <h4>Add friends through the <Link to={`/users`}>user search tool</Link>!</h4>
            </div>
        )
    }

    return(
        <div>
            {friends.map(f => (
                <div>
                    <Link to={`/profile/${f}`} reloadDocument>{f}</Link>
                </div>
            ))}
        </div>
    )
}

export default FriendList;
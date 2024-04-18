import React, { useState } from "react";
import { Link } from "react-router-dom";

const FriendList = function({user}){

    const [friends, setFriends] = useState(user.friends);

    console.log(friends);

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
import React, {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import UserContext from './UserContext';
import TriviaCarpApi from './api';


const ProfileForm = function(){
    const navigate = useNavigate();
    const {currUser, setCurrUser} = useContext(UserContext);
    const [formData, setFormData] = useState({
        email: currUser.email
    });

    const handleChange = function(evt){
        const {name, value} = evt.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }));
    };

    const handleSubmit = async function(evt){
        evt.preventDefault();
        const updatedProfile = await TriviaCarpApi.editProfile(currUser.username, {email: formData.email});
        console.log('update passed');

        setCurrUser(currUser => ({
            ...currUser,
            data: updatedProfile
        }));

        navigate('/');
    };

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='email'>Email:</label>
                <input onChange={handleChange} name='email' id='email' value={formData.email}/>
                <button>Submit Changes</button>
            </form>
        </div>
    )
}

export default ProfileForm;
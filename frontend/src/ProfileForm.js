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
        <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4 mt-5">
            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='email'>Email:</label>
                            <br/>
                            <input onChange={handleChange} name='email' id='email' value={formData.email}/> 
                        </div>
                        <button>Submit Changes</button>
                    </form> 
                </div>
            </div>
        </div>
        
    )
}

export default ProfileForm;
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const SignupForm = function({signup}){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: ''
    })

    const handleChange = function(evt){
        const {name, value} = evt.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }));
    };

    const handleSubmit = async function(evt){
        evt.preventDefault();
        await signup(formData);
        setFormData({
            username: '',
            password: '',
            email: ''   
        });
        navigate('/');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username:</label>
                <input onChange={handleChange} name='username' id='username' value={formData.username}/>
                <label htmlFor='password'>Password:</label>
                <input onChange={handleChange} name='password' id='password' value={formData.password}/>
                <label htmlFor='email'>Email:</label>
                <input onChange={handleChange} name='email' id='email' value={formData.email}/>
                <button>Sign Up</button>
            </form>
        </div>
    )
}

export default SignupForm;
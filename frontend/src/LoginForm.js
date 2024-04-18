import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const LoginForm = function({login}){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
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
        await login(formData);
        setFormData({
            username: '',
            password: ''  
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
                <button>Login</button>
            </form>
        </div>
    )
}

export default LoginForm;
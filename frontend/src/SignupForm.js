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
        <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4 mt-5">
            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='username'>Username:</label>
                        <br/>
                        <input onChange={handleChange} name='username' id='username' value={formData.username}/>
                        <br/>
                        <label htmlFor='password'>Password:</label>
                        <br/>
                        <input type="password" onChange={handleChange} name='password' id='password' value={formData.password}/>
                        <br/>
                        <label htmlFor='email'>Email:</label>
                        <br/>
                        <input onChange={handleChange} name='email' id='email' value={formData.email}/>
                        <br/>
                        <button>Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignupForm;
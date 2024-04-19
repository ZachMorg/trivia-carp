import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import TriviaCarpApi from './api';

const GameStartForm = function(){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        amount: 10,
        category: 9,
        type: 'multiple'
    });
    const [categories, setCategories] = useState([]);

    useEffect(function getAllCategories(){
        async function callApi(){
            setCategories(await TriviaCarpApi.getCategories());
        }
        callApi();
    },[]);

    if(categories.length === 0){
        return(<h2>Loading...</h2>)
    }

    const handleChange = function(evt){
        const {name, value} = evt.target;
        console.log(name);
        console.log(value);
        setFormData(formData => ({
            ...formData,
            [name]: value
        }));
        console.log(formData.category);
    };

    const handleSubmit = async function(evt){
        evt.preventDefault();
        if(formData.amount === undefined){
            return;
        }
        
        navigate(`/play/${formData.amount}/${formData.category}/${formData.type}`);

        setFormData({
            amount: 10,
            category: 9,
            type: 'multiple'
        });
    };

    return(
        <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4 mt-5">
            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='amount'>Number of questions:</label>
                        <br/>
                        <input onChange={handleChange} name='amount' id='amount' value={formData.amount}/>
                        <br/>
                        <label htmlFor='category'>Category:</label>
                        <br/>
                        <select onChange={handleChange} name='category' id='category'>
                            {categories.map(c => (
                                <option value={c.id}>{c.name}</option>
                            ))}
                        </select>
                        <br/>
                        <label htmlFor='type'>Type:</label>
                        <br/>
                        <select onChange={handleChange} name='type' id='type'>
                            <option value='multiple'>Multiple Choice</option>
                            <option value='boolean'>True or False</option>
                        </select>
                        <br/>
                        <button>Start Game!</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default GameStartForm;
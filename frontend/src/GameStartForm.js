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

    if(categories == []){
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
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='amount'>Number of questions:</label>
                <input onChange={handleChange} name='amount' id='amount' value={formData.amount}/>
                <label htmlFor='category'>Category:</label>
                <select onChange={handleChange} name='category' id='category'>
                    {categories.map(c => (
                        <option value={c.id}>{c.name}</option>
                    ))}
                </select>
                <label htmlFor='type'>Type:</label>
                <select onChange={handleChange} name='type' id='type'>
                    <option value='multiple'>Multiple Choice</option>
                    <option value='boolean'>True or False</option>
                </select>
                <button>Start Game!</button>
            </form>
        </div>
    )
}

export default GameStartForm;
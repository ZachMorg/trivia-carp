import React, {useState} from 'react';

function SearchForm({submit}){
    const [search, setSearch] = useState('');

    const handleChange = function(evt){
        setSearch(evt.target.value);
    };

    const handleSubmit = function(evt){
        evt.preventDefault();
        submit(search);
        setSearch('');
    };

    return (
            <div className="search-div my-4 mx-auto">
                <div className="d-flex justify-content-center">
                    <form onSubmit={handleSubmit}>
                        <input onChange={handleChange} name='search' id='search' value={search}/>
                        <button>Search</button>
                    </form> 
                </div>
            </div>
    )
}

export default SearchForm;
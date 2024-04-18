import {useState, useEffect} from 'react';


const useLocalStorage = function(key, initVal = null){
    let firstVal;
    if(localStorage.getItem(key)){
        firstVal = localStorage.getItem(key);
    }
    else{
        firstVal = initVal;
    }

    const [item, setItem] = useState(firstVal);

    useEffect(function setLocalStorage(){
        if(item === null){
            localStorage.removeItem(key);
        }   
        else{
            localStorage.setItem(key, item);
        }
    },[key, item]);

    return [item, setItem];
}

export default useLocalStorage;
import React, {useEffect, useState, useContext} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import Question from './Question';
import TriviaCarpApi from './api';
import UserContext from './UserContext';

const Game = function(){
    const {saveGameResults} = useContext(UserContext);
    const navigate = useNavigate();
    const params = useParams();
    console.log(params);
    const [questions, setQuestions] = useState([]);
    const [numCorrect, setNumCorrect] = useState(0);
    const [currQuestion, setCurrQuestion] = useState(0);


    useEffect(function getGameQuestions(){
        async function callApi(){
            setQuestions(await TriviaCarpApi.getQuestions(params));
        }
        callApi();
    }, []);
    

    if(questions.length === 0){
        return(<h2>Loading...</h2>)
    }


    const handleAnswer = function(answer){
        if(questions[currQuestion].correct_answer === answer){
            setNumCorrect(numCorrect + 1);
        }
        setCurrQuestion(currQuestion + 1);
    }

    const returnResults = async function(){
        const data = {numQuestions: questions.length, numCorrect: numCorrect, category: questions[0].category}
        await saveGameResults(data);
    }

    if(currQuestion > questions.length-1){
        returnResults();
        return(
            <div className="d-flex justify-content-center">
                <h2>You got {numCorrect} out of {questions.length} questions right!</h2>
            </div>
        )
    }

    console.log(questions[currQuestion]);
    console.log(questions);
    return(
        <Question handleAnswer={handleAnswer} question={questions[currQuestion]}/>
    )
}

export default Game;
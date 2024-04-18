import React, {useEffect, useState} from 'react';

const Question = function({handleAnswer, question}){

    const [answers, setAnswers] = useState([]);

    useEffect(function randomizeCorrectAnswer(){
        
        const ranVal = Math.floor(Math.random()*4);
        console.log(question);
        let tempAnswers = [...question.incorrect_answers];
        tempAnswers.splice(ranVal, 0, question.correct_answer);
        setAnswers([...tempAnswers]);

    }, [question]);

    const handleSubmit = function(evt){
        evt.preventDefault();
        handleAnswer(evt.target.value);
    }

    if(!answers.length === 4){
        return(<h2>Loading...</h2>);
    }

    console.log(answers);

    return(
        <div>
            <h2>{question.question}</h2>
            <form>
                {answers.map(a => (
                    <div>
                        <button onClick={handleSubmit} value={a}>{a}</button>
                    </div>
                ))}
            </form>
        </div>
    )
}

export default Question;
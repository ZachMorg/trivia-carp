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
            <div className="d-flex justify-content-center">
               <h2>{question.question}</h2> 
            </div>
            <div className="container col-md-6 offset-md-3 col-lg-3 offset-lg-3 mt-5">
                <div className="card text-center">
                    <form>
                        {answers.map(a => (
                            <div className="my-4">
                                <button onClick={handleSubmit} value={a}>{a}</button>
                            </div>
                        ))}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Question;
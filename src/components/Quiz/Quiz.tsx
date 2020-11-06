import React, {useEffect, useState} from "react"
import {Question, Result} from "../../reducers/quizReducer";
import axios from 'axios'
import Results from "../Results/Results";

interface IProps {
    quiz: Question[]
    getQuizById: any
    match: any
    setUserAnswer: any
    userAnswers: string[]
    setResults: any,
    results: Result[]
}

const Quiz: React.FC<IProps> = (props) => {
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>()

    useEffect(() => {
        const getProps = async () => {
            await props.getQuizById(props.match.params.id)
            await setCurrentQuestionIdx(prevState => prevState = 0)
        }
        getProps()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const nextQuestionHandler = () => {
        if (currentQuestionIdx! < props.quiz.length - 1 ) {
            setCurrentQuestionIdx(prevState => prevState! + 1)
        }
    }

    const prevQuestionHandler = () => {
        if (currentQuestionIdx !== 0 ) {
            setCurrentQuestionIdx(prevState => prevState! - 1)
        }
    }

    const chooseAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setUserAnswer(event.target.defaultValue, currentQuestionIdx, props.userAnswers)
    }

    const isChecked = (answerId: number) => {
        if (props.userAnswers.find(answer => Number(answer) === answerId)) {
            return true
        }
        return false
    }

    const sendResults = () => {
        const data = {answers: JSON.stringify(props.userAnswers)}
        axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/results`, data).then(r => props.setResults(r.data))
    }

    const isDisableToNext = () => {
        if (!props.userAnswers[currentQuestionIdx!]) {
            return true
        }
        return false
    }

    return (
    <div>
        {props.quiz.length !== 0 && currentQuestionIdx !== undefined && props.results.length === 0 && <div>
                    <p>{props.quiz[currentQuestionIdx].text}</p>
                        {props.quiz[currentQuestionIdx].answers.map((answer) => {

                            return <p key={answer.id}>
                                <label>
                                    <input
                                        name="answers"
                                        type="radio"
                                        value={answer.id}
                                        onChange={chooseAnswer}
                                        defaultChecked={isChecked(answer.id)}
                                    />
                                    <span>{answer.text}</span>
                                </label>
                            </p>
                        })}

                    <button onClick={prevQuestionHandler}>Prev Question</button>
            {props.quiz.length -1  > currentQuestionIdx
                ? <button onClick={nextQuestionHandler} disabled={isDisableToNext()}> Next Question</button>
                : <button onClick={sendResults}>Send Results</button>}

        </div>}

        {props.results.length !== 0 && <Results results={props.results}/>}

    </div>
    )
}

export default Quiz

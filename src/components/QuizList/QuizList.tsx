import React, {useState} from "react";
import {IQuizInfo} from "../../reducers/quizReducer";

interface IProps {
    quizes: IQuizInfo[]
}

const QuizList: React.FC<IProps> = (props) => {
    const { quizes } = props
    const [testId, setTestId] = useState<string>()

    const radioButtonHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTestId(event.target.defaultValue)
    }

    const quizLinkHandler = (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (!testId) event.preventDefault()
    }

    return (
    <div>
        <h2>Choose Test</h2>
        <div className='flex-container'>
            {quizes && quizes.map((quiz) => {
                return <p key={quiz.id}>
                    <label>
                        <input name="answers" type="radio" value={quiz.id} onChange={radioButtonHandler}/>
                        <span>{quiz.name}</span>
                    </label>
                </p>
            })}
        </div>
        <a href={`/test/${testId}`} className="waves-effect waves-light btn" onClick={quizLinkHandler}>Start Test</a>
    </div>
    )
}

export default QuizList


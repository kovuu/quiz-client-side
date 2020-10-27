import React, {ComponentProps, useState} from "react"


interface TestInt {
    id: number
    name: string
}

const TestsList: React.FC<ComponentProps<any>> = (props) => {
    const [testId, setTestId] = useState<string>()

    const radioButtonHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTestId(event.target.defaultValue)
    }

    return (
        <div>
        <div className='flex-container'>
            {props.questions.length !== 0 && props.questions.map((question: TestInt) => {
               return <p key={question.id}>
                    <label>
                        <input name="answers" type="radio" value={question.id} onChange={radioButtonHandler}/>
                        <span>{question.name}</span>
                    </label>
                </p>
            })}
        </div>
    <button className="waves-effect waves-light btn" onClick={(e) => props.chooseTestHandler(e, testId)}>Start Test</button>
        </div>

)
}

export default TestsList

import React, {useRef, useState} from 'react'
import {IQuizInfo} from "../../reducers/quizReducer";
import './TestsList.css'
import axios from 'axios'

interface IProps {
    getAllQuizes: () => void
    quizes: IQuizInfo[]
}

const TestsList: React.FC<IProps> = (props) => {
    const [isEdit, setIsEdit] = useState<number>()
    const ref = useRef<HTMLInputElement | null>(null)

    const editHandler = (id: number) => {
        setIsEdit(id)
    }

    const stopEditHandler = () => {
        setIsEdit(undefined)
    }



    const editTestNameHandler = async (id: number) => {
        const data = {
            id: id,
            name: ref.current!.value
        }
        await axios.post('http://localhost:4000/edit_test_name', data)
            .then(r => {
                stopEditHandler()
                props.getAllQuizes()
            })
    }

    const keyboardHandler = (event: React.KeyboardEvent<HTMLInputElement>, id: number) => {
        if (event.key === 'Enter') {
            editTestNameHandler(id)
        }
    }

    return (
        <div>
            <h2>Test's Editor</h2>
            {props.quizes.map((quiz) => {
               return ( <div key={quiz.id}>
                   {isEdit !== quiz.id && <>
                        <a href={`edit/${quiz.id}`}>{quiz.name}</a>
                       <i className="material-icons" onClick={() => editHandler(quiz.id)}>edit</i>
                        </>
                   }
                   {isEdit === quiz.id &&
                   <div>
                   <div hidden={false} className="input-field col s6">
                         <input ref={ref} onKeyPress={(event) => keyboardHandler(event, quiz.id)} defaultValue={quiz.name} id="last_name" type="text" className="validate" placeholder={quiz.name}/>
                    </div>
                       <button className="waves-effect waves-light btn" onClick={() => editTestNameHandler(quiz.id)}>Save</button>
                       <button className="waves-effect waves-light btn" onClick={stopEditHandler}>Cancel</button>
                   </div>}
                </div> )
                }
            )}
        </div>
    )
}

export default TestsList
import React from 'react'
import {Result} from "../../reducers/quizReducer";

interface IProps {
    results: Result[]
}

const Results: React.FC<IProps> = ({results}) => {
    return (
        <div>
            {results.map((result) => {
                return (
                    <div>
                        <p>{result.description}</p>
                        <img src={result.imageLink} height="400"/>
                    </div>
                )
            })}
            <a href='/' className="waves-effect waves-light btn">Back to Tests</a>
            <a href={`/test/${results[0].test_id}`} className="waves-effect waves-light btn">Reload test</a>

        </div>
    )
}

export default Results

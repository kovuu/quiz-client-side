import React from 'react'
import './Results.css'
import {Result} from "../../reducers/quizReducer";


interface IProps {
    results: Result[]
}

const Results: React.FC<IProps> = ({results}) => {
    return (
        <div className='results-block'>
            {results.map((result) => {
                return (
                    <div key={result.description}>
                        <p>{result.description}</p>
                        <div className='images-block'>
                        {result.imagesLinks.map((item) => {
                            return <img alt='img' key={item.imageLink} src={item.imageLink} />
                            })
                        }
                        </div>
                    </div>
                )
            })}
            <div className='buttons-block'>
                <a href='/' className="waves-effect waves-light btn">Back to Tests</a>
                <a href={`/test/${results[0].test_id}`} className="waves-effect waves-light btn">Reload test</a>
            </div>
        </div>
    )
}

export default Results

import React, {useEffect} from 'react'
import './TestEditor.css'
import { Route, Link} from 'react-router-dom'
import AnswersEditor from '../../containers/AnswersEditor'
import ResultsEditor from '../ResultsEditor/ResultsEditor'


interface IProps {
    match: any,
    setTestData: (testId: number) => void
}


const TestEditor: React.FC<IProps> = ({match, setTestData}) => {
    useEffect(() => {
        setTestData(match.params.id)
    }, [])


    return (
        <div>
            <div className='flex-container edit-menu'>
                <Link to={`${match.url}/answers`}><button className='btn'>Edit answers</button></Link>
                <Link to={`${match.url}/results`}><button className='btn'>Edit results</button></Link>
            </div>
            <Route path={`${match.path}/answers`} component={AnswersEditor}/>
            <Route path={`${match.path}/results`} component={ResultsEditor}/>

            <div className='flex-container buttons-container'>
                <button className='btn'>Back to TestList</button>
                <button className='btn'>Save</button>
            </div>
        </div>

    )
}

export default TestEditor

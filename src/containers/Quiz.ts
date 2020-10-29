import {IAppState} from "../store/store";
import {connect} from "react-redux";
import Quiz from "../components/Quiz/Quiz";
import {AnyAction} from 'redux'
import {ThunkDispatch} from 'redux-thunk'

import {getQuizById, setResults, setUserAnswer} from "../actions/quizActions";
import {Result} from "../reducers/quizReducer";





const mapStateToProps = (store: IAppState) => {
    return {
        quiz: store.quizState.currentQuiz,
        userAnswers: store.quizState.userAnswers,
        results: store.quizState.results
    }
}

const mapDispatchToProps = (
    dispatch: ThunkDispatch<any, any, AnyAction>
) => {
    return {
        getQuizById: (quizId: string) => dispatch(getQuizById(quizId)),
        setResults: (results: Result[]) => dispatch(setResults(results)),
        setUserAnswer: (answerId: string, questionIdx: number, userAnswers: string[]) => dispatch(setUserAnswer(answerId, questionIdx, userAnswers))
    }
}

// const mapDispatchToProps = (dispatch) =>  {
//     getQuizById: (testId: string) => dispatch(getQuizById(testId))
// }



export default connect(mapStateToProps, mapDispatchToProps)(Quiz)

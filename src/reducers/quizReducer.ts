import {Reducer} from 'redux'
// import {createTracing} from "trace_events";
import {QuizActions, QuizActionTypes} from "../actions/quizActions";

export interface IQuizInfo {
    id: number
    name: string
}

export interface IQuizState {
    quizes: IQuizInfo[],
    currentQuiz: Question[],
    userAnswers: string[],
    results: Result[],
    testData: TestData | null
}

export interface Result {
    test_id: number,
    imagesLinks: ImageLink[],
    description: string
}

export interface ImageLink {
    imageLink: string
}

export interface Question {
    id: number
    order: number
    text: string
    answers: Answer[]
}

export interface Answer {
    id: number
    text: string
}

export interface TestData {
    questions: any[]
    results: any[]
}

const initialQuizState: IQuizState = {
    quizes: [],
    currentQuiz: [],
    userAnswers: [],
    results: [],
    testData: null
}




// const initialState = {
//     quizes: [],
//     results: [],
//     activeQuestion: 0,
//     quiz: null
// }

export const quizReducer: Reducer<IQuizState, QuizActions> = (
    state= initialQuizState,
    action) =>
    {
        switch (action.type) {
            case QuizActionTypes.GET_ALL_QUIZES: {
                return {
                    ...state,
                    quizes: action.quizes,
                }
            }
            case QuizActionTypes.QUIZ_BY_ID: {
                return {
                    ...state,
                    currentQuiz: action.quiz,
                    results: []
                }
            }
            case QuizActionTypes.SET_USER_ANSWER: {
                return {
                    ...state,
                    userAnswers: action.userAnswers
                }
            }
            case QuizActionTypes.SET_RESULTS: {
                return {
                    ...state,
                    results: action.results
                }
            }
            case QuizActionTypes.SET_TEST_DATA: {
                return {
                    ...state,
                    testData: action.data
                }
            }
            default:
                return state
        }

}

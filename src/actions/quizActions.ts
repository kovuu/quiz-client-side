import { ActionCreator, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import axios from 'axios'

import {IQuizInfo, IQuizState, Question, Result} from "../reducers/quizReducer"

export interface IExtraDispatchArguments {

}

export enum QuizActionTypes {
    GET_ALL_QUIZES = 'GET_ALL_QUIZES',
    QUIZ_BY_ID = 'QUIZ_BY_ID',
    SET_USER_ANSWER = 'SET_USER_ANSWER',
    SET_RESULTS = 'SET_RESULTS'
}

export interface IQuizGetAllQuizesAction {
    type: QuizActionTypes.GET_ALL_QUIZES
    quizes: IQuizInfo[],
}

export interface IQuizQuizByIdAction {
    type: QuizActionTypes.QUIZ_BY_ID,
    quiz: Question [],
}

export interface IQuizSetUserAnswerAction {
    type: QuizActionTypes.SET_USER_ANSWER,
    userAnswers: string[]
}

export interface IQuizSetResultsAction {
    type: QuizActionTypes.SET_RESULTS,
    results: Result[]
}

export type QuizActions = IQuizGetAllQuizesAction | IQuizQuizByIdAction | IQuizSetUserAnswerAction | IQuizSetResultsAction

export const getAllQuizes: ActionCreator<
    ThunkAction<Promise<any>, IQuizState, null, IQuizGetAllQuizesAction>> = () => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await axios.get('http://localhost:4000/tests')
            dispatch({
                quizes: response.data,
                type: QuizActionTypes.GET_ALL_QUIZES
            })
        } catch (err) {
            console.error(err)
        }
    }
}

export const getQuizById: ActionCreator<
    ThunkAction<Promise<any>, IQuizState, null, IQuizQuizByIdAction>> = (testId: string) => {

    return async (dispatch: Dispatch) => {
        try {
            const response = await axios.get(`http://localhost:4000/test/${testId}`)
            dispatch({
                quiz: response.data,
                type: QuizActionTypes.QUIZ_BY_ID
            })
        } catch (err) {
            console.error(err)
        }
    }
}

export const setUserAnswer = (answerId: string, questionIdx: number, userAnswers: string[]) => {

    // let userAnswers = store().getState().quizState.userAnswers.slice(0)
    //
    let newArr: string[] = []
    if (!userAnswers) {
        newArr = []
    } else {
        newArr = userAnswers.slice(0)
    }
    if (!newArr) {
        newArr = [answerId]
    } else if (questionIdx < newArr.length) {
        newArr.splice(questionIdx, 1, answerId)
    } else {
        newArr.push(answerId)
    }


    return async (dispatch: Dispatch) => {
        await dispatch({
            userAnswers: newArr,
            type: QuizActionTypes.SET_USER_ANSWER
        })
    }
}

export const setResults = (results: Result[]) => {

    return async (dispatch: Dispatch) => {
        await dispatch({
            results: results,
            type: QuizActionTypes.SET_RESULTS
        })
    }
}


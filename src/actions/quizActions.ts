import { ActionCreator, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import axios from 'axios'

import {IQuizInfo, IQuizState, Question, Result, TestData} from "../reducers/quizReducer"

export interface IExtraDispatchArguments {

}

export enum QuizActionTypes {
    GET_ALL_QUIZES = 'GET_ALL_QUIZES',
    QUIZ_BY_ID = 'QUIZ_BY_ID',
    SET_USER_ANSWER = 'SET_USER_ANSWER',
    SET_RESULTS = 'SET_RESULTS',
    SET_TEST_DATA = 'SET_TEST_DATA'
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

export interface IQuizSetTestDataAction {
    type: QuizActionTypes.SET_TEST_DATA,
    data: TestData
}

export type QuizActions = IQuizGetAllQuizesAction | IQuizQuizByIdAction | IQuizSetUserAnswerAction
        | IQuizSetResultsAction | IQuizSetTestDataAction

export const getAllQuizes: ActionCreator<
    ThunkAction<Promise<any>, IQuizState, null, IQuizGetAllQuizesAction>> = () => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/tests`)
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
            const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/test/${testId}`)
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

export const setTestData: ActionCreator<
    ThunkAction<Promise<any>, IQuizState, null, IQuizQuizByIdAction>> = (id: number) => {

    return async (dispatch: Dispatch) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/test/${id}/data`)
            dispatch({
                type: QuizActionTypes.SET_TEST_DATA,
                data: response.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}

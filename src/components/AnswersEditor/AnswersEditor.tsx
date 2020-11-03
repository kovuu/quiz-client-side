import React, {useEffect, useState} from 'react'
import './AnswersEditor.css'
import {Formik, Form, Field, FieldArray, ErrorMessage} from 'formik'

interface IProps {
    questions: Questions[],
    results: Results[],
    addQuestionToTest: (questionData: any, testId: number) => void,
    match: any
}

interface Questions {
    answers: any[]
    text: string
}

interface Results {
    id: number
    description: string
}



const AnswersEditor: React.FC<IProps> = ({questions, results, addQuestionToTest, match}) => {
    const [isShowForm, setIsShowForm] = useState<boolean>(false)
    const [testQuestions, setTestQuestions] = useState<any>()

    useEffect(() => {
        const arr = []
        for (let question of questions) {
            arr.push({
                question: question.text,
                answers: question.answers
            })
        }
        setTestQuestions({questions: arr})
    }, [])


    const [initialValues, setInitialValues] = useState({
        question: '',
        answers: [
            {
                text: '',
                results: '3'
            }
        ]
    })



    const questionFormToggle = () => {
        setIsShowForm(prevState => {
            return !prevState
        })
    }

    return (
         <div>
            {questions.map((question) => {
                return (
                    <div className='question-block'>
                    <h3>{question.text}</h3>
                    {question.answers.map((answer) => {
                        return (
                            <p>{answer.text}</p>
                        )
                    })}
                    </div>
                )
            })}
            <button onClick={questionFormToggle}>Add question</button>

            {isShowForm && <div className='form-block'>
                <Formik
                    initialValues={testQuestions}
                    onSubmit={(values => {
                        console.log(values)
                    })}>
                    {({ values }) => (
                        <Form>
                            <div className="row">
                                <div className='col'>
                                    <FieldArray name='questions'>
                                        {({ insert, remove, push}) => (
                                            <div>
                                                {values.questions.length > 0 &&
                                                    values.questions.map((question: any, index: any) => {
                                                        console.log(question)
                                                        return (
                                                        <div key={index}>
                                                            <div className='row form-block'>
                                                                <Field
                                                                    name={`question.${index}.question`}
                                                                    value={question.question}
                                                                />
                                                                <ErrorMessage name={`answers.${index}.text`}
                                                                              component="div"
                                                                              className="field-error"
                                                                />
                                                                <h3>Answers</h3>

                                                                {question.answers.length > 0 &&
                                                                    question.answers.map((answer: any, index: any) => {
                                                                        return (
                                                                            <Field type='text'
                                                                                    value={answer.text}
                                                                            />
                                                                        )
                                                                    })}

                                                            </div>
                                                        </div>
                                                        )})}
                                            </div>
                                        )}
                                    </FieldArray>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
                {/*<Formik*/}
                {/*    initialValues={initialValues}*/}
                {/*    onSubmit={async (values) => {*/}
                {/*         addQuestionToTest(values, match.params.id)*/}
                {/*         questionFormToggle()*/}
                {/*        }*/}
                {/*    }*/}
                {/*    >*/}
                {/*    {({ values }) => (*/}
                {/*        <Form>*/}
                {/*            <div className="row">*/}
                {/*                <div className='col'>*/}
                {/*                 <label htmlFor='question'>Question</label>*/}
                {/*                 <Field id='question' name='question' type="text"/>*/}
                {/*                    <ErrorMessage name='question'*/}
                {/*                                  component="div"*/}
                {/*                                  className="field-error"*/}
                {/*                    />*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <FieldArray name='answers'>*/}
                {/*                {({ insert, remove, push }) => (*/}
                {/*                    <div>*/}
                {/*                        {values.answers.length > 0 &&*/}
                {/*                             values.answers.map((answer, index) => (*/}
                {/*                                 <div className='row' key={index}>*/}
                {/*                                     <div className='col'>*/}
                {/*                                         <label htmlFor={`answers.${index}.text`}>Answer</label>*/}
                {/*                                         <Field*/}
                {/*                                            name={`answers.${index}.text`}*/}
                {/*                                            type="text"*/}
                {/*                                         />*/}
                {/*                                         <ErrorMessage name={`answers.${index}.text`}*/}
                {/*                                                       component="div"*/}
                {/*                                                       className="field-error"*/}
                {/*                                                       />*/}

                {/*                                     </div>*/}
                {/*                                     <div className='col'>*/}
                {/*                                         <Field as="select" name={`answers.${index}.results`} multiple>*/}
                {/*                                             {results.map((result) => {*/}
                {/*                                                 return (*/}
                {/*                                                     <option value={result.id}>*/}
                {/*                                                         {result.description}*/}
                {/*                                                     </option>*/}
                {/*                                                 )*/}
                {/*                                             })}*/}
                {/*                                         </Field>*/}
                {/*                                     </div>*/}
                {/*                                     <div className="col">*/}
                {/*                                         <button*/}
                {/*                                             type="button"*/}
                {/*                                             className="secondary"*/}
                {/*                                             onClick={() => remove(index)}*/}
                {/*                                         >*/}
                {/*                                             X*/}
                {/*                                         </button>*/}
                {/*                                     </div>*/}
                {/*                                 </div>*/}
                {/*                             ))}*/}
                {/*                        <button*/}
                {/*                            type="button"*/}
                {/*                            className="secondary"*/}
                {/*                            onClick={() => push({text: ''})}*/}
                {/*                        >*/}
                {/*                            Add Answer*/}
                {/*                        </button>*/}
                {/*                    </div>*/}
                {/*                )}*/}
                {/*            </FieldArray>*/}
                {/*            <button type="submit">Add</button>*/}
                {/*        </Form>*/}
                {/*    )}*/}
                {/*</Formik>*/}
            </div>}
        </div>
    )
}

export default AnswersEditor

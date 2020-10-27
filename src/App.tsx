import React from 'react';
import './App.css';
import {Route, Switch, BrowserRouter} from 'react-router-dom'
import QuizList from "./containers/QuizList";
import Quiz from "./containers/Quiz";

const App: React.FC = () => {
  return (
    <div className="App">
        <BrowserRouter>
            <Switch>
                <Route path='/test/:id' component={Quiz} />
                <Route path='/' component={QuizList} exact/>
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;

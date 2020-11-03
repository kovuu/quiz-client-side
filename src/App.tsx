import React from 'react';
import './App.css';
import {Route, Switch, BrowserRouter} from 'react-router-dom'
import QuizList from "./containers/QuizList";
import Quiz from "./containers/Quiz";
import MenuBar from "./components/MenuBar/MenuBar";
import TestsList from "./containers/TestsList";
import TestEditor from "./containers/TestEditor";

const App: React.FC = () => {
  return (
    <div className="App">

        <BrowserRouter>
                <MenuBar />
            <Switch>
                <Route path='/edit/:id' component={TestEditor} />
                <Route path='/editor_list' component={TestsList} />
                <Route path='/test/:id' component={Quiz} />
                <Route path='/' component={QuizList} exact/>
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;

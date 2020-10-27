import {IAppState} from "../store/store";
import {connect} from "react-redux";
import QuizList from "../components/QuizList/QuizList";

const mapStateToProps = (store: IAppState) => {
    return {
        quizes: store.quizState.quizes
    }
}

export default connect(mapStateToProps)(QuizList)

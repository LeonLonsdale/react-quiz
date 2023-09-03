import { useEffect, useReducer } from 'react';

import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StarScreen from './StarScreen';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';

const initialState = {
  questions: [],
  status: '', // loading / error / ready / active / finished
  index: 0,
  answer: null,
  points: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'dataFailed':
      return { ...state, status: 'error' };
    case 'start':
      return { ...state, status: 'active' };
    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null };
    case 'newAnswer':
      // get correct option and points from current question
      // action.payload is the option the user has selected
      const { correctOption, points } = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === correctOption
            ? state.points + points
            : state.points,
      };
    default:
      throw new Error('Unknown action');
  }
};

export default function App() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const numQuestions = questions.length;
  const totalPoints = questions.reduce((acc, cur) => acc + cur.points, 0);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch('http://localhost:8000/questions');
      if (!response?.ok) throw new Error(response.status);
      const data = await response.json();
      dispatch({ type: 'dataReceived', payload: data });
    };
    fetchQuestions().catch((err) => dispatch({ type: 'dataFailed' }));
  }, []);

  return (
    <div className='app'>
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StarScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
              points={points}
            />
            <NextButton dispatch={dispatch} answer={answer} />
          </>
        )}
      </Main>
    </div>
  );
}

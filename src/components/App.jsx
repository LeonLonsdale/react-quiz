import { useEffect, useReducer } from 'react';

import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StarScreen from './StarScreen';
import Question from './Question';

const initialState = {
  questions: [],
  status: '', // loading / error / ready / active / finished
  index: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'dataFailed':
      return { ...state, status: 'error' };
    case 'start':
      return { ...state, status: 'active' };
    default:
      throw new Error('Unknown action');
  }
};

export default function App() {
  const [{ questions, status, index }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const numQuestions = questions.length;

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
        {status === 'active' && <Question question={questions[index]} />}
      </Main>
    </div>
  );
}

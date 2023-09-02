// import { useState } from 'react'
import { useEffect, useReducer } from 'react';

import DateCounter from './components/DateCounter';
import Header from './components/Header';
import Main from './components/Main';

const initialState = {
  questions: [],
  status: '', // loading / error / ready / active / finished
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'dataFailed':
      return { ...state, status: 'error' };
    default:
      throw new Error('Unknown action');
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchQuestions = async () => {
      // try {
      const response = await fetch('http://localhost:8000/questions');
      if (response && !response.ok) throw new Error(response.status);
      const data = await response.json();
      dispatch({ type: 'dataReceived', payload: data });
    };
    fetchQuestions().catch((err) => dispatch({ type: 'dataFailed' }));
  }, []);

  return (
    <div className='app'>
      <Header />
      <Main>
        <p>1/15</p>
        <p>Question</p>
      </Main>
    </div>
  );
}

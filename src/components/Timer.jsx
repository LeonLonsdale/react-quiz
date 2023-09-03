import { useEffect } from 'react';

export default function Timer({ dispatch, secondsRemaining }) {
  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;

  useEffect(() => {
    const intervalID = setInterval(() => {
      dispatch({ type: 'tick' });
    }, 1000);
    return () => clearInterval(intervalID);
  }, [dispatch]);

  return (
    <div className='timer'>
      {mins < 10 && '0'}
      {mins}:{secs < 10 && '0'}
      {secs}
    </div>
  );
}

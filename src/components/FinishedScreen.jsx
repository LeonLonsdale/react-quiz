export default function FinishedScreen({
  points,
  totalPoints,
  highscore,
  dispatch,
}) {
  const percentage = (points / totalPoints) * 100;

  return (
    <>
      <p className='result'>
        You scored <strong>{points}</strong> out of {totalPoints} (
        {Math.ceil(percentage)}%);
      </p>
      <p className='highscore'>(Highscore: {highscore} points)</p>
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: 'restart' })}
      >
        Restart
      </button>
    </>
  );
}

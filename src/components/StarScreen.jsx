export default function StarScreen({ numQuestions }) {
  return (
    <div className='start'>
      <h2>Welcome to The React Quiz!</h2>
      <h3>
        {numQuestions} {numQuestions === 1 ? 'question' : 'questions'} to test
        your React mastery
      </h3>
      <button className='btn btn-ui'>Let's start</button>
    </div>
  );
}

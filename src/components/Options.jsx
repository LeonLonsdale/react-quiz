import OptionsButton from './OptionsButton';

export default function Options({ question }) {
  return (
    <div className='options'>
      {question.options.map((option) => (
        <OptionsButton option={option} key={option} />
      ))}
    </div>
  );
}

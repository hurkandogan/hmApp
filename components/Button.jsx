// No implementation yet.
const Button = (props) => {
  const { text, onClick, className, disabled, icon } = props;
  return (
    <button onClick={onClick} className={className} disabled={disabled}>
      <span>
        {icon}
        {text}
      </span>
    </button>
  );
};

export default Button;

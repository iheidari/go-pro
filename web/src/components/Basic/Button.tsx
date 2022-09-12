type ButtonProps = {
  label: string;
  title?: string;
  disabled?: boolean;
  isLoading?: boolean;
  onClick: () => void;
};

const Button = ({
  label,
  title,
  disabled,
  isLoading,
  onClick,
}: ButtonProps) => {
  const normalStyle =
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
  const disabledStyle =
    "bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed";
  return (
    <button
      title={title}
      onClick={onClick}
      className={disabled || isLoading ? disabledStyle : normalStyle}
      disabled={disabled || isLoading}
    >
      {isLoading ? "Loading" : label}
    </button>
  );
};

export default Button;

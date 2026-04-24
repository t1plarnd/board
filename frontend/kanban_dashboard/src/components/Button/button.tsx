import { type FC } from 'react';

interface ButtonProps{
    value: string;
    onClick: () => void ;
}

const Button: FC<ButtonProps> = ({value, onClick}) => {
  return (
    <button onClick={onClick}>{value}</ button>
  );
}

export default Button;
import { type FC } from 'react';

interface BottonProps{
    value: string;
    onClick: ()=> void;
}

const Button: FC<BottonProps> = ({value, onClick}) => {
  return (
    <button onClick={onClick}>{value}</ button>
  );
}

export default Button;
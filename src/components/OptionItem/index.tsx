import { ButtonHTMLAttributes } from "react";
import * as S from "./styles";

interface OptionItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  option: string;
  active: boolean;
}

const OptionItem = ({ option, active, onClick }: OptionItemProps) => {
  return (
    <S.OptionItem active={active} onClick={onClick}>
      <h3>{option}</h3>
    </S.OptionItem>
  );
};

export default OptionItem;

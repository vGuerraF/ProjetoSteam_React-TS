import OptionItem from "../OptionItem";
import * as S from "./styles";
import { v4 as uuidv4 } from "uuid";

interface OptionsListProps {
  options: string[];
  currentManager: string;
  setCurrentManager: (state: string) => void;
}

const OptionsList = ({
  options,
  currentManager,
  setCurrentManager,
}: OptionsListProps) => {
  return (
    <S.OptionsList>
      {options.map((option) => {
        return (
          <OptionItem
            active={option === currentManager}
            option={option}
            onClick={() => {
              setCurrentManager(option);
            }}
            key={uuidv4()}
          />
        );
      })}
    </S.OptionsList>
  );
};

export default OptionsList;

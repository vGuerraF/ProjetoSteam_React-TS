import * as S from "./styles";

interface SecondaryContainerProps {
  light: boolean;
  children: any;
}

const SecondaryContainer = (props: SecondaryContainerProps) => {
  return (
    <S.SecondaryContainer light={props.light}>
      {props.children}
    </S.SecondaryContainer>
  );
};

export default SecondaryContainer;

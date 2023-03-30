import * as S from "./styles";

interface DefaultContainerProps {
  light?: boolean;
  children: any;
}

const DefaultContainer = (props: DefaultContainerProps) => {
  return (
    <S.DefaultContainer light={props.light}>
      {props.children}
    </S.DefaultContainer>
  );
};

export default DefaultContainer;

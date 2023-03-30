import styled, { css } from "styled-components";
import { DefaultContainerProps } from "../DefaultContainer/styles";

interface SecondaryContainerProps extends DefaultContainerProps {}

export const SecondaryContainer = styled.section<SecondaryContainerProps>`
  ${({ theme, light }) => css`
    background-color: ${theme.colors.primaryColor};
    background-image: ${light
      ? theme.constants.bg2Light
      : theme.constants.bg2Dark};
  `}
  min-height: 100vh;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
`;

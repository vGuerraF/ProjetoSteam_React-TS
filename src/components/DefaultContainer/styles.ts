import styled, { css } from "styled-components";

export interface DefaultContainerProps {
  light?: boolean;
}

export const DefaultContainer = styled.section<DefaultContainerProps>`
  ${({ theme, light }) => css`
    background-color: ${theme.colors.primaryColor};
    background-image: ${light
      ? theme.constants.bg1Light
      : theme.constants.bg1Dark};
  `}
  min-height: 100vh;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
`;

import styled, { css } from "styled-components";

export const OptionsList = styled.div`
  ${({ theme }) => css`
    width: 18%;
    height: 100%;
    overflow: auto;
    border: 0.063rem solid ${theme.colors.glassBorderColor};
    border-radius: ${theme.constants.defaultBorderRadius} 0 0
      ${theme.constants.defaultBorderRadius};
  `}
`;

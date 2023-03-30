import styled, { css } from "styled-components";

export const AdmContentBox = styled.div`
  width: 80%;
  margin: 0 auto;
  height: 100%;
  ${({ theme }) => css`
    border-radius: 0 ${theme.constants.defaultBorderRadius}
      ${theme.constants.defaultBorderRadius} 0;
  `}
  padding: 3rem 1rem 1rem 1rem;
`;

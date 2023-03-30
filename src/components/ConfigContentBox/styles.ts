import styled, { css } from "styled-components";

export const ConfigContentBox = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.primaryColorOpacity};
    ${theme.mixins.defaultGlass()}
    margin: 60px auto;
    width: 75%;
    height: 700px;
    border: 1px solid ${theme.colors.glassBorderColor};
    border-radius: ${theme.constants.defaultBorderRadius};
    display: flex;
  `}
`;

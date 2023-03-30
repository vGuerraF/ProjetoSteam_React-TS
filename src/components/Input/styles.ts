import styled, { css } from "styled-components";

interface InputProps {
  inputSize?: "small" | "large" | "x-large";
}

export const Input = styled.input<InputProps>`
  ${({ theme, inputSize }) => css`
    height: 20px;
    width: 450px;
    border-radius: ${theme.constants.defaultBorderRadius};
    border: 1px solid ${theme.colors.glassBorderColor};
    color: ${theme.colors.whiteTextColor};
    background-color: ${theme.colors.primaryColorOpacity};
    padding: 1rem 1rem;
    font-size: 1.2rem;
    font-family: ${theme.constants.defaultFontfamily};
    letter-spacing: 1px;
    text-align: left;
    ${theme.mixins.defaultGlass()}

    width: ${inputSize === "small" && "250px"};
    width: ${inputSize === "large" && "640px"};
    width: ${inputSize === "x-large" && "800px"};
  `}
`;

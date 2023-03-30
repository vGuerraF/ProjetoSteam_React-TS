import styled, { css } from "styled-components";

interface ButtonProps {
  specialColor?: "delete" | "purple";
}

export const DefaultButton = styled.button<ButtonProps>`
  ${({ theme, specialColor }) => css`
    ${theme.mixins.defaultButton(specialColor)}
  `}
`;

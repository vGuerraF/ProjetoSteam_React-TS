import styled, { css } from "styled-components";

interface StyledOptionItemProps {
  active: boolean;
}

export const OptionItem = styled.button<StyledOptionItemProps>`
  ${({ theme, active }) => css`
    width: 100%;
    height: 6.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: ${active ? theme.colors.testColor : "transparent"};
    transition: all 0.3s ease;
    :hover {
      background-color: ${!active && theme.colors.tertiaryColorOpacity};
    }
    h3 {
      ${theme.mixins.titleStyle()}
    }
  `}
`;

import styled, { css } from "styled-components";
import { Theme } from "../../styles/styled-components";

interface SwiperContainerProps {
  theme?: Theme;
}

export const SwiperContainer = styled.section<SwiperContainerProps>`
  ${({ theme }) => css`
    ${theme.mixins.defaultGlass()}
    background: ${theme.colors.secondaryColorOpacity};
    width: 90%;
    height: 15.625rem;
    border: 0.063rem solid ${theme.colors.glassBorderColor};
    margin: 1.875rem auto;
    border-radius: ${theme.constants.defaultBorderRadius};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 2rem;
  `}
`;

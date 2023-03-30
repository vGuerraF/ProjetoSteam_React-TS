import styled, { css } from "styled-components";

export const NewReleaseContainer = styled.div`
  width: 55%;
  height: 12.5rem;
  margin: 1.875rem auto;
  display: flex;
  ${({ theme }) => css`
    background: ${theme.colors.tertiaryColorOpacity};
    border: 0.063rem solid ${theme.colors.glassBorderColor};
    ${theme.mixins.defaultGlass()}

    img {
      height: 100%;
      align-self: center;
      margin: auto;
    }

    div {
      background-color: ${theme.colors.primaryColorOpacity};
      width: 40%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 1.2rem;
      align-items: center;

      p,
      span {
        font-family: ${theme.constants.defaultFontfamily};
        color: ${theme.colors.whiteTextColor};
      }

      p {
        max-width: 100%;
        text-align: justify;
        font-size: 0.8rem;
        overflow: hidden;
      }

      span {
        font-size: 1.3rem;
        font-weight: 700;
      }
    }
  `}

  section {
    width: 70%;
  }
`;

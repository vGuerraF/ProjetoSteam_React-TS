import styled, { css } from "styled-components";

export const ContainerProfileSelection = styled.div`
  max-width: 80%;
  max-height: 43.75rem;
  background-color: transparent;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  overflow-y: auto;
`;

export const CreateProfileCard = styled.a`
  ${({ theme }) => css`
    width: 15.625rem;
    background: transparent;
    height: 15.625rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    cursor: pointer;

    div {
      width: 80%;
      height: 12.5rem;
      border-radius: 50%;
      border: 0.188rem dashed ${theme.colors.tertiaryColor};
      transition: all 0.3s ease;
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        ${theme.mixins.titleStyle()}
        font-size: 3rem;
      }
    }

    p {
      ${theme.mixins.titleStyle()}
      font-weight: 400;
      margin: 0.625rem;
    }

    :hover {
      div {
        border: 0.188rem dashed ${theme.colors.testColor};
      }
    }
  `}
`;

export const TitleProfileSelection = styled.h2`
  ${({ theme }) => css`
    ${theme.mixins.logoTitleStyle()}
    font-weight: 400;
    font-size: 1.8rem;
    text-align: center;
    padding: 4rem 1rem;
  `}
`;

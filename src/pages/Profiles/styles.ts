import { AiOutlineSend } from "react-icons/ai";
import styled, { css } from "styled-components";

export const ProfileOptionContainer = styled.div`
  ${({ theme }) => css`
    width: 320px;
    height: 100%;
    border: 0.063rem solid ${theme.colors.glassBorderColor};
    border-radius: ${theme.constants.defaultBorderRadius} 0 0
      ${theme.constants.defaultBorderRadius};
    flex-wrap: nowrap;
    overflow-y: auto;
    overflow-x: hidden;
  `}
`;

export const ProfileForm = styled.div`
  ${({ theme }) => css`
    height: 100%;
    width: 100%;
    border-radius: 0 ${theme.constants.defaultBorderRadius}
      ${theme.constants.defaultBorderRadius} 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: 1rem 3rem;

    form {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 2.5rem;
      margin-bottom: 0.5rem;

      a {
        ${theme.mixins.iconButtonStyle(false)}
      }
    }

    label {
      ${theme.mixins.headingStyle()}
      font-size: 1.5rem;
    }

    div {
      width: 100%;
      display: flex;
      justify-content: space-evenly;
    }
  `}
`;

export const SendIcon = styled(AiOutlineSend)`
  ${({ theme }) => css`
    ${theme.mixins.iconStyle()}
  `}
`;

import { AiOutlineSend } from "react-icons/ai";
import styled, { css } from "styled-components";

export const UserForm = styled.div`
  ${({ theme }) => css`
    height: 100%;
    width: 100%;
    border-radius: 0 ${theme.constants.defaultBorderRadius}
      ${theme.constants.defaultBorderRadius} 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 3rem;

    span {
      ${theme.mixins.titleStyle()}
      color: red;
      text-align: start;
      align-self: flex-start;
      font-size: 1.15rem;
    }

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
  `}
`;

export const SendIcon = styled(AiOutlineSend)`
  ${({ theme }) => css`
    ${theme.mixins.iconStyle()}
  `}
`;

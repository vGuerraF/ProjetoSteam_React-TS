import { AiOutlineClose } from "react-icons/ai";
import styled, { css } from "styled-components";

export const ModalCreateGenre = styled.form`
  ${({ theme }) => css`
    background: ${theme.colors.tertiaryColorOpacity};
    ${theme.mixins.defaultGlass()}
    height: 31.25rem;
    width: 31.25rem;
    border: 1px solid ${theme.colors.glassBorderColor};
    border-radius: ${theme.constants.defaultBorderRadius};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    overflow: auto;

    section {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1.5rem;
      border-bottom: 1px solid ${theme.colors.glassBorderColor};

      a {
        ${theme.mixins.iconButtonStyle(false)}
      }

      span {
        ${theme.mixins.headingStyle}
        color: ${theme.colors.whiteTextColor};
        font-size: x-large;
      }
    }

    div {
      width: 100%;
      height: 4.375rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      label {
        ${theme.mixins.titleStyle()}
        font-weight: 400;
        font-size: 1.2rem;
      }
    }
  `}
`;

export const CloseModalIcon = styled(AiOutlineClose)`
  ${({ theme }) => css`
    ${theme.mixins.iconStyle()}
  `}
`;

export const FormErrors = styled.p`
  ${({ theme }) => css`
    ${theme.mixins.titleStyle()}
    font-size: medium;
    color: red;
    align-self: center;
  `}
`;

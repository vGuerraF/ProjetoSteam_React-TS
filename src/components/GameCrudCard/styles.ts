import { BiEditAlt, BiTrashAlt } from "react-icons/bi";
import styled, { css } from "styled-components";

export const GameCrudCard = styled.div`
  ${({ theme }) => css`
    display: flex;
    width: 100%;
    height: 5.625rem;
    border: 0.063rem solid ${theme.colors.glassBorderColor};
    border-radius: 0 ${theme.constants.defaultBorderRadius}
      ${theme.constants.defaultBorderRadius} 0;
    ${theme.mixins.defaultGlass()}
    margin: 1.5rem 0;
    padding-right: 1rem;
    background: ${theme.colors.tertiaryColorOpacity};

    img {
      height: 100%;
    }

    section#crudCardInfo {
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: space-between;

      div#infos {
        display: flex;
        height: 100%;
        margin-left: 1.5rem;
        flex-direction: column;
        justify-content: space-between;
        width: 350px;
        h3 {
          ${theme.mixins.titleStyle()}
          font-weight: 700;
          font-size: 1.3rem;
        }

        p {
          ${theme.mixins.titleStyle()}
          font-weight: 400;
          font-size: 0.825rem;
        }

        section#yearAndScore {
          display: flex;
        }
      }
    }
  `}
`;

export const EditIcon = styled(BiEditAlt)`
  ${({ theme }) => theme.mixins.iconStyle()}
`;

export const DeleteIcon = styled(BiTrashAlt)`
  ${({ theme }) => theme.mixins.iconStyle()}
`;

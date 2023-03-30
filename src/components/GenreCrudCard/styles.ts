import { BiEditAlt, BiTrashAlt } from "react-icons/bi";
import styled, { css } from "styled-components";

export const GenreCrudCard = styled.div`
  ${({ theme }) => css`
    width: 250px;
    height: 150px;
    border: 1px solid ${theme.colors.glassBorderColor};
    border-radius: ${theme.constants.defaultBorderRadius};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem;
    text-align: center;
    background: ${theme.colors.tertiaryColorOpacity};
    ${theme.mixins.defaultGlass()}

    p {
      ${theme.mixins.titleStyle()}
      font-size: 1.5rem;
    }

    div {
      width: 100%;
      display: flex;
      justify-content: space-around;

      a {
        ${theme.mixins.iconButtonStyle()}
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

import styled, { css } from "styled-components";
import { BiPlus, BiSearch } from "react-icons/bi";

export const GameCrudBox = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    section {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 3rem;
      a {
        ${theme.mixins.iconButtonStyle(false)}
      }

      div {
        display: flex;
        gap: 15px;
        a {
          ${theme.mixins.iconButtonStyle(false)}
        }
      }
    }

    div#gameList {
      width: 100%;
      height: 100%;
      overflow-y: auto;
    }
  `}
`;

export const SearchIcon = styled(BiSearch)`
  ${({ theme }) => theme.mixins.iconStyle()}
`;

export const AddIcon = styled(BiPlus)`
  ${({ theme }) => theme.mixins.iconStyle()}
`;

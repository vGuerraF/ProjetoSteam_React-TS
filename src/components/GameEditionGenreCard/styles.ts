import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import styled, { css } from "styled-components";

export const GenreCard = styled.article`
  ${({ theme }) => css`
    width: 250px;
    height: 50px;
    border: 1px solid ${theme.colors.glassBorderColor};
    border-radius: ${theme.constants.defaultBorderRadius};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    text-align: center;
    background: ${theme.colors.tertiaryColorOpacity};
    ${theme.mixins.defaultGlass()}
    p {
      ${theme.mixins.titleStyle()}
      font-size: 1rem;
    }
    a {
      ${theme.mixins.iconButtonStyle()}
    }
  `}
`;

export const AddIcon = styled(AiOutlinePlus)`
  ${({ theme }) => theme.mixins.iconStyle()}
`;

export const RemoveIcon = styled(AiOutlineMinus)`
  ${({ theme }) => theme.mixins.iconStyle()}
`;

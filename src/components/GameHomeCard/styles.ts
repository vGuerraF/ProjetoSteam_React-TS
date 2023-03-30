import styled, { keyframes } from "styled-components";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

const divOverlayAnimation = keyframes`
  0%{
    transform: translateY(50px);
  }
  100%{
    transform: translateY(0px);
  }
`;

export const GameHomeCard = styled.div`
  background-color: ${({ theme }) => theme.colors.secondaryColorOpacity};
  width: 360px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.glassBorderColor};

  img {
    width: 100%;
  }

  a {
    ${({ theme }) => theme.mixins.iconButtonStyle()}
    position: absolute;
    bottom: 130px;
    left: 0px;
    cursor: pointer;
    z-index: 9999;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    ${({ theme }) => theme.mixins.titleStyle()}
    position: absolute;
    transition: all 0.5s ease;
    height: 100%;
    width: 360px;

    p,
    span {
      opacity: 0%;
      transition: all 0.5s ease;
    }
  }

  :hover {
    div {
      background: ${({ theme }) => theme.colors.primaryColorOpacity};
      animation: ${divOverlayAnimation} 0.3s ease;
      p,
      span {
        opacity: 100%;
        display: block;
      }

      span {
        font-weight: 400;
      }

      p {
        font-size: large;
      }
    }
  }
`;

export const FavoriteIconUnselected = styled(MdFavoriteBorder)`
  ${({ theme }) => theme.mixins.iconStyle()}
`;

export const FavoriteIconSelected = styled(MdFavorite)`
  ${({ theme }) => theme.mixins.iconStyle()}
`;

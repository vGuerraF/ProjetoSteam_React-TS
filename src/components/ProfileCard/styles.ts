import styled, { css } from "styled-components";

interface ProfileCardProps {
  active?: boolean;
}

export const ProfileCard = styled.a<ProfileCardProps>`
  ${({ theme, active }) => css`
    width: 15.625rem;
    background: transparent;
    height: 15.625rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;

    img {
      width: 80%;
      height: 12.5rem;
      border-radius: 50%;
      border: 0.625rem solid
        ${active ? theme.colors.tertiaryColorOpacity : "transparent"};
      transition: all 0.3s ease;
    }

    p {
      ${theme.mixins.titleStyle()}
      font-weight: 400;
      margin: 0.625rem;
    }

    :hover {
      img {
        border: 0.625rem solid ${theme.colors.tertiaryColorOpacity};
      }
      p {
        color: ${theme.mixins.primaryColor};
      }
    }
  `}
`;

import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import styled, { css } from "styled-components";

export const FooterIconButton = styled.a`
  ${({ theme }) => css`
    border-radius: ${theme.constants.defaultBorderRadius};

    :hover {
      background-color: ${theme.colors.glassBorderColor};
    }
  `}
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: pointer;
`;

export const Footer = styled.footer`
  height: 50px;
  width: calc(100% - 56px);
  transform: translateX(56px);
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${({ theme }) => theme.mixins.defaultGlass()}
  ${({ theme }) => theme.mixins.footerStyle()}
  background-color: ${({ theme }) => theme.colors.secondaryColor};

  #footerLogos {
    display: flex;
    gap: 5px;
  }
`;

export const LinkedinLogo = styled(AiFillLinkedin)`
  transform: scale(1.5);
  color: ${({ theme }) => theme.colors.whiteColor};
`;

export const GithubLogo = styled(AiFillGithub)`
  transform: scale(1.5);
  color: ${({ theme }) => theme.colors.whiteColor};
`;

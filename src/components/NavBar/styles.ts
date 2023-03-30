import { BiCog, BiHome, BiLockAlt, BiLogOut, BiUser } from "react-icons/bi";
import styled, { css } from "styled-components";

interface NavBarIconProps {
  active?: boolean;
}

export const NavBar = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondaryColorOpacity};
    border: 0.063rem solid ${theme.colors.glassBorderColor};
    ${theme.mixins.defaultGlass()}
  `}
  border-radius: 0 0.313rem 0.313rem 0;
  height: 100vh;
  width: 3.5rem;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 0;
`;

export const IconGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
`;

export const NavBarIcon = styled.a<NavBarIconProps>`
  ${({ theme, active }) => css`
    ${theme.mixins.iconButtonStyle(active)}
  `}
`;

export const SettingsIcon = styled(BiCog)`
  ${({ theme }) => css`
    ${theme.mixins.iconStyle}
  `}
`;

export const HomeIcon = styled(BiHome)`
  ${({ theme }) => css`
    ${theme.mixins.iconStyle}
  `}
`;

export const ProfileIcon = styled(BiUser)`
  ${({ theme }) => css`
    ${theme.mixins.iconStyle}
  `}
`;

export const AdminIcon = styled(BiLockAlt)`
  ${({ theme }) => css`
    ${theme.mixins.iconStyle}
  `}
`;

export const LogoutIcon = styled(BiLogOut)`
  ${({ theme }) => css`
    ${theme.mixins.iconStyle}
  `}
`;

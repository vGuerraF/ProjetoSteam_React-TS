import styled, { css } from "styled-components";

export const ModalOverlay = styled.div`
  ${({ theme }) => css`
    ${theme.mixins.overlay()}
  `}
`;

export const ModalOverlayCrudBox = styled.div`
  ${({ theme }) => css`
    ${theme.mixins.overlayCrudBox()}
  `}
`;

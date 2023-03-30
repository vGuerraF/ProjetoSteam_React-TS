import { ReactNode } from "react";
import * as S from "./styles";

interface ModalOverlayProps {
  children: ReactNode;
}

export const ModalOverlay = ({ children }: ModalOverlayProps) => {
  return <S.ModalOverlay>{children}</S.ModalOverlay>;
};

export const ModalOverlayCrudBox = ({ children }: ModalOverlayProps) => {
  return <S.ModalOverlayCrudBox>{children}</S.ModalOverlayCrudBox>;
};

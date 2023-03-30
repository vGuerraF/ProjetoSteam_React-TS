import { css } from "styled-components";
import { boolean } from "yup";
import { colors } from "./colors";
import { constants } from "./constants";

const headingStyle = (inLightMode = false) => css`
  font-family: ${constants.defaultFontfamily};
  color: ${inLightMode ? colors.darkTextColor : colors.whiteTextColor};
  font-size: ${constants.headingTextSize};
  font-weight: 400;
`;

const titleStyle = () => css`
  font-family: ${constants.defaultFontfamily};
  color: ${colors.whiteTextColor};
  font-size: ${constants.titleStyle};
  font-weight: 700;
`;

const logoTitleStyle = () => css`
  font-family: ${constants.defaultFontfamily};
  color: ${colors.whiteTextColor};
  font-size: ${constants.logoTitle};
  font-weight: 400;
`;

const footerStyle = () => css`
  font-family: ${constants.defaultFontfamily};
  font-weight: 400;
  color: ${colors.whiteTextColor};
  letter-spacing: 0.2px;
`;

const overlay = () => css`
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const overlayCrudBox = () => css`
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${constants.defaultBorderRadius};
`;

const secondaryBackgroundBox = (light = false) => css`
  min-height: 100vh;
  width: 100%;
  background-color: ${colors.primaryColor};

  background-image: ${light ? constants.bg2Light : constants.bg2Dark};

  background-repeat: no-repeat;
  background-size: cover;
`;

const defaultGlass = () => css`
  -webkit-backdrop-filter: blur(${constants.glassBlur});
  backdrop-filter: blur(${constants.glassBlur});
`;

const defaultButton = (specialColor: "delete" | "purple" | undefined) => css`
  height: 45px;
  width: 300px;
  background-color: transparent;
  border: 3px solid;
  border-radius: ${constants.defaultBorderRadius};
  border-color: ${specialColor === "delete"
    ? colors.deleteColor
    : specialColor === "purple"
    ? colors.tertiaryColor
    : colors.primaryColor};
  cursor: pointer;
  transition: all 0.3s ease;
  color: ${colors.whiteTextColor};
  font-family: ${constants.defaultFontfamily};
  font-size: 1.2rem;
  font-weight: 400;

  :hover {
    background-color: ${specialColor === "delete"
      ? colors.deleteColor
      : specialColor === "purple"
      ? colors.tertiaryColor
      : colors.primaryColor};
  }
`;

const iconButtonStyle = (active: boolean) => css`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: ${constants.defaultBorderRadius};
  transition: all ${constants.defaultHoverAnimationDuration} ease;
  color: ${active ? colors.tertiaryColor : colors.whiteColor};
  :hover {
    background-color: ${colors.glassBorderColor};
  }
`;

const iconStyle = () => css`
  transform: scale(1.5);
`;

export const mixins = {
  headingStyle,
  footerStyle,
  overlay,
  overlayCrudBox,
  secondaryBackgroundBox,
  defaultGlass,
  titleStyle,
  logoTitleStyle,
  defaultButton,
  iconStyle,
  iconButtonStyle,
};

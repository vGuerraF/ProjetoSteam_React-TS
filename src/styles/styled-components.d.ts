import theme from "./theme";

type Theme = typeof theme;

declare module "styled-components" {
  export default interface DefaultTheme extends Theme {}
}

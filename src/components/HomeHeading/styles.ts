import styled from "styled-components";

interface ContentBoxProps {
  inLightMode?: boolean;
}

export const HomeHeading = styled.h2<ContentBoxProps>`
  ${({ theme, inLightMode }) => theme.mixins.headingStyle(inLightMode)}
`;

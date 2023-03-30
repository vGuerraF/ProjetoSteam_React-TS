import styled, { css } from "styled-components";

interface ContentBoxProps {
  profile_img: string;
}

export const ContentBox = styled.div<ContentBoxProps>`
  ${({ profile_img }) => css`
  min-height: calc(100vh - 50px);
  width: calc(100% - 58px);
  padding: 30px;
  transform: translateX(56px);
  display: flex;
  flex-direction: column;

  #logoAndPic {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 0 1.5rem;
    margin: 0 0 40px 0;

    #profilePicture {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      background: url(${profile_img});
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    }
  `}
`;

import * as S from "./styles";

const Footer = (props: any) => {
  return (
    <S.Footer>
      <div>
        Desenvolvido por <span>Vinicius Guerra</span>
      </div>

      <div id="footerLogos">
        <S.FooterIconButton
          href="https://github.com/vGuerraF?tab=repositories"
          target="_blank"
        >
          <S.GithubLogo />
        </S.FooterIconButton>
        <S.FooterIconButton
        >
          <S.LinkedinLogo />
        </S.FooterIconButton>
      </div>
    </S.Footer>
  );
};

export default Footer;

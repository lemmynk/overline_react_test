import theme from '../../styles/theme';

const htmlBodyCss = `
  html,
  body,
  #root {
    height: 100vh;
    width: 100vw;
  }

  body {
    background-color: ${theme.color.bodyBgColor};
    color: ${theme.fontColor.bodyFontColor};
  }

  // Handle rem breakpoint sizes here
  html {
    font-size: 10px;
    @media screen and (min-width: ${theme.size.sm}) {
      font-size: 14px;
    }
  }

  body {
    font-family: 'Poppins', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
`;

export default htmlBodyCss;

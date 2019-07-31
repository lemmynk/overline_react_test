import { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';
import htmlBody from './htmlBody';
import commonClasses from './commonClasses';

const GlobalStyle = createGlobalStyle`
  ${normalize()}
  ${htmlBody}
  ${commonClasses}
`;

export default GlobalStyle;

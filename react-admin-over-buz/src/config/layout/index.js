import { headerWebConfig, headerAppConfig } from './header';
import { footerWebConfig, footerAppConfig } from './footer';
import { sidebarWebConfig, sidebarAppConfig } from './sidebar';

const appLayout = {
  headerConfig: headerAppConfig,
  footerConfig: footerWebConfig,
  sidebarConfig: sidebarWebConfig,
};

const webLayout = {
  headerConfig: headerWebConfig,
  footerConfig: footerAppConfig,
  sidebarConfig: sidebarAppConfig,
};

export default { webLayout, appLayout };

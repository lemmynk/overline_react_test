// @flow
import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import {
  AppRoute,
  Whoops404,
  // Whoops403,
  // USER_ROLE_ALL,
} from '@newtash/react-app-core';
import {
  HOME,
  // THEME,
  // SHOWROOM_LAYOUT,
  // SHOWROOM_MODAL,
  // SHOWROOM_DATE_PICKER,
  // SHOWROOM_MESSAGE_BOXES,
  // SHOWROOM_BUTTONS_LINKS,
  // SHOWROOM_TABLE,
  // SHOWROOM_FORMS,
  // SHOWROOM_NAV,
  // SHOWROOM_PAGE,
  // SHOWROOM_PAGINATION,
  // SHOWROOM_I18N,
  // SHOWROOM_WHOOPS403,
  // SHOWROOM_API_SELECT,
} from '../config';
import {
  DashboardPage,
  // LayoutComponentsPage,
  // ThemeShowcasePage,
  // ModalComponentPage,
  // DatePickerComponentPage,
  // MessageBoxesPage,
  // ButtonsLinksComponentsPage,
  // TableComponentPage,
  // FormComponentsPage,
  // NavComponentsPage,
  // PageComponentsPage,
  // PaginationComponentPage,
  // I18nPage,
  // ApiSelectComponentPage,
} from '../pages';

type Props = {
  doInitApp: () => void,
};

const AppRouter = (props: Props) => {
  const { doInitApp } = props;

  useEffect(() => {
    if (doInitApp) {
      doInitApp();
    }
  }, []);

  return (
    <Switch>
      {/* <AppRoute
        path={THEME}
        component={ThemeShowcasePage}
        role={USER_ROLE_ALL}
      />
      <AppRoute path={SHOWROOM_LAYOUT} component={LayoutComponentsPage} />
      <AppRoute path={SHOWROOM_MODAL} component={ModalComponentPage} />
      <AppRoute
        path={SHOWROOM_DATE_PICKER}
        component={DatePickerComponentPage}
      />
      <AppRoute path={SHOWROOM_MESSAGE_BOXES} component={MessageBoxesPage} />
      <AppRoute
        path={SHOWROOM_BUTTONS_LINKS}
        component={ButtonsLinksComponentsPage}
      />
      <AppRoute path={SHOWROOM_TABLE} component={TableComponentPage} />
      <AppRoute path={SHOWROOM_FORMS} component={FormComponentsPage} />
      <AppRoute path={SHOWROOM_NAV} component={NavComponentsPage} />
      <AppRoute path={SHOWROOM_PAGE} component={PageComponentsPage} />
      <AppRoute
        path={`${SHOWROOM_PAGINATION}/:page?`}
        component={PaginationComponentPage}
      />
      <AppRoute path={SHOWROOM_I18N} component={I18nPage} /> */}
      {/* <AppRoute path={SHOWROOM_WHOOPS403} component={Whoops403} /> */}
      {/* <AppRoute path={SHOWROOM_API_SELECT} component={ApiSelectComponentPage} /> */}
      <AppRoute exact path={HOME} component={DashboardPage} />
      <AppRoute path="*" component={Whoops404} />
    </Switch>
  );
};

export default AppRouter;

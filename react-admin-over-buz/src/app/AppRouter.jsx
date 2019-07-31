// @flow
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Whoops404 from './Whoops404';
import { HomePage, SecondPage, AnotherPage } from '../pages';

const AppRouter = () => (
  <Switch>
    <Route path="/another" component={AnotherPage} />
    <Route path="/second" component={SecondPage} />
    <Route exact path="/" component={HomePage} />
    <Route path="*" component={Whoops404} />
  </Switch>
);

export default AppRouter;

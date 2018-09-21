import React from 'react';
import { Router, Switch, Route, Redirect } from 'dva/router';
import InputData from "./components/InputData";
import 'antd/dist/antd.css';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
    <Switch>
    <Route path="/basicInput" component={InputData} />
      <Route path="/detailInput" component={InputData} />
      <Route path="/basicAnalyze" component={InputData} />
      <Redirect to="/basicInput" />
    </Switch>
    </Router >

  );
}

export default RouterConfig;

import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import defaultDash from './default';

const Dashboards = ({ match }) => (
    <div className="dashboard-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/default`} />
            <Route path={`${match.url}/default`} component={defaultDash} />
            <Redirect to="/error" />

        </Switch>
    </div>
);
export default Dashboards;
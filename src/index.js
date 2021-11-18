import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { Skeleton } from 'antd';
import { Route, Redirect, BrowserRouter as Router, Switch } from 'react-router-dom';

// REDUX
import { public_route, private_route } from './config/route';
// STYLES
import "antd/dist/antd.css";
import "./styled/index.css"
// 
import reportWebVitals from './reportWebVitals';
import store, { persistor } from './store';
import PrivateRoute from './helper/router/private_route';
import AppLayout from './com/app_layout';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Skeleton />} persistor={persistor}>
        <AppLayout>
          <Router>
            <Switch>
              {public_route.map(route => (
                <Route key={route.path} exact path={route.path}>
                  <route.Com />
                </Route>
              ))}
              {private_route.map(({exact = true,...route}) => (
                <PrivateRoute key={route.path} exact={exact} path={route.path}>
                  <route.Com />
                </PrivateRoute>
              ))}
              <Redirect to="/404" />
            </Switch>
          </Router>
        </AppLayout>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './paginas/home';
import CadLog from './paginas/login_cadastro';

import Painel from './paginas/painel';

const Rotas= () => {

  return(
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Home/> }/>
        <Route exact path="/cadlog" render={() => <CadLog/> }/>

        <Route exact path="/painel" render={() => <Painel/> }/>
      </Switch>
  </Router>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Rotas/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

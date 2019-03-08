import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './index.css';
import App from './pages/App';
import Login from './pages/login';
import Signup from './pages/signup';
import Save from './pages/Save';
import registerServiceWorker from './registerServiceWorker';

/* Here we will create our routes right off the bat in order to 
prevent the user from getting very far in our app without authentication. */
ReactDOM.render(
<Router>
    <div>
        <Route exact path="/" component={App} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/saved" component={Save} />
    </div>
</Router>, document.getElementById('root'));
registerServiceWorker();

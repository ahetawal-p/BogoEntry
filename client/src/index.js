import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { register } from './serviceWorker';

ReactDOM.render(React.createElement(App), document.getElementById('root'));
register();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
if (module.hot && process.env.NODE_ENV !== 'production') {
  module.hot.accept();
}
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Visualizer from './containers/visualizer';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Visualizer />, document.getElementById('root'));
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ChildComponent from './ChildComponent';

const isChildWindow = window.location.pathname.includes('child.html');

if (isChildWindow) {
  ReactDOM.render(<ChildComponent />, document.getElementById('root'));
} else {
  ReactDOM.render(<App />, document.getElementById('root'));
}

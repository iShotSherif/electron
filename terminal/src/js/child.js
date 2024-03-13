// child.js
import React from 'react';
import ReactDOM from 'react-dom';
import ChildComponent from './ChildComponent';

ReactDOM.render(
  <React.StrictMode>
    <ChildComponent isChild={true} />
  </React.StrictMode>,
  document.getElementById('child-root')
);

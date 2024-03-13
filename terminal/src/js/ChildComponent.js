import React from 'react';
import { ipcRenderer } from 'electron';

const ChildComponent = ({ isChild, onClose, onOpenChildWindow }) =>  {
    const handleClose = () => {
    ipcRenderer.send('child-window-closed');
    window.close(); 
  };
return (
  <div>
    {!isChild && (
    <button onClick={onOpenChildWindow}>Open in New Window</button>
    )}
    <button onClick={handleClose}>Close Component</button>
  </div>
);
}
export default ChildComponent;

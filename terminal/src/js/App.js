import React, { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import ChildComponent from './ChildComponent';

export default function App() {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    window.electron.receive('reopen-component', () => {
      console.log('reopen-component received');
      setShowChild(true);
    });
  }, []);

  const openChildWindow = () => {
    ipcRenderer.send('open-child-window');
    setShowChild(false);
  };

  return (
    <>
      <button onClick={() => setShowChild(true)}>Open Component</button>
      {showChild && (
        <ChildComponent
          onOpenChildWindow={openChildWindow}
        />
      )}
    </>
  );
}

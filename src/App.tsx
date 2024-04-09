import React, { useState, lazy, Suspense } from 'react';
import logo from './logo.svg';
import './App.css';

const PreviewPage = lazy(() => import('./components/Preview'));

function App() {

 
  return (
    <div className="App">
      <Suspense fallback={null}>{React.createElement(PreviewPage)}</Suspense>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

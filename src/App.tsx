import React, { useState, lazy, Suspense } from 'react';
import logo from './logo.svg';
import './App.css';

const PreviewPage = lazy(() => import('./components/Preview'));

function App() {

 
  return (
    <div className="App">
      <Suspense fallback={null}>{React.createElement(PreviewPage)}</Suspense>
    </div>
  );
}

export default App;

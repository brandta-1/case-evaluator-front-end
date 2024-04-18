import React, { useState, lazy, Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { ListItem, ListItemIcon, ListItemButton, ListItemText } from '@mui/material';

const PreviewPage = lazy(() => import('./components/Preview'));
const Feed = lazy(() => import('./components/Feed'));
const Article = lazy(() => import('./components/Article'));
function App() {

  const drawerWidth = 300;
 
  return (
    <div className="App">
      
      
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
      </Drawer>
      <Suspense fallback={null}>{React.createElement(Feed)}</Suspense>
      <Suspense fallback={null}>{React.createElement(PreviewPage)}</Suspense>
    </div>
  );
}

export default App;

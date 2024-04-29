import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { store } from './components/Slice/store.ts'; 

ReactDOM.render(
  <Provider store={store}> 
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Views/App';
import reportWebVitals from './Views/reportWebVitals';


import { GlobalStyle } from './Components'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle>
        <App />
    </GlobalStyle>
  </React.StrictMode>
);

reportWebVitals();

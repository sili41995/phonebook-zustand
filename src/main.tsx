import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import ReactDOM from 'react-dom/client';
import App from '@/components/App';
import GlobalStyles from '@/components/GlobalStyles';
import Toast from '@/components/Toast';
import { theme } from '@/constants';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
        <Toast />
        <GlobalStyles />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

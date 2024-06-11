import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider> {/* Auth Context */}
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </AuthProvider>
);

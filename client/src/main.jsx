import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { PageProvider } from './contexts/PageContext.jsx';
import { WorkoutProvider } from './contexts/WorkoutContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <BrowserRouter>
            <PageProvider>
                <WorkoutProvider>
                    <App />
                </WorkoutProvider>
            </PageProvider>
        </BrowserRouter>
    </AuthProvider>
);

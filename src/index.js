import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';
import App from './App';
import './assets/styles/index.css';
import './assets/styles/theme.css';  // Import the theme styles

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Router>
                <App />
            </Router>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);

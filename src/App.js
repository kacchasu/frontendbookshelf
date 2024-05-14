import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import RegistrationPage from "./pages/RegistrationPage";

function App() {
    return (
        <Router>
            <AuthProvider>
                <Switch>
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegistrationPage} />
                    <PrivateRoute exact path="/" component={DashboardPage} />
                    {/* Additional routes */}
                </Switch>
            </AuthProvider>
        </Router>
    );
}

export default App;

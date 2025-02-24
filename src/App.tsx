import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import "./index.css"
import ProtectedRoute from './components/ProtectedRoute';
import AuthRoute from './components/AuthRoute';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute/>}>
        <Route path="/" element={<LoginPage />} />
        </Route>
        <Route element={<AuthRoute/>}>
        <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

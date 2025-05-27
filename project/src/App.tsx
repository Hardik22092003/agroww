import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import StocksPage from './pages/StocksPage';
import StockDetailPage from './pages/StockDetailPage';
import BankAccountPage from './pages/BankAccountPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

// Layout
import ProtectedRoute from './components/layout/ProtectedRoute';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/stocks" element={<StocksPage />} />
          <Route path="/stocks/:id" element={<StockDetailPage />} />
          <Route path="/bank-account" element={<BankAccountPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
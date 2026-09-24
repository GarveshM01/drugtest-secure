import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TestProvider } from './context/TestContext';

import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import NewTestLayout from './pages/NewTestFlow/NewTestLayout';
import Step1Kit from './pages/NewTestFlow/Step1Kit';
import Step2Category from './pages/NewTestFlow/Step2Category';
import Step3Sample from './pages/NewTestFlow/Step3Sample';
import Step4KitDetails from './pages/NewTestFlow/Step4KitDetails';
import Step5Instructions from './pages/NewTestFlow/Step5Instructions';
import Step6Camera from './pages/NewTestFlow/Step6Camera';
import Step7Analysis from './pages/NewTestFlow/Step7Analysis';
import Step8Result from './pages/NewTestFlow/Step8Result';
import Step9Record from './pages/NewTestFlow/Step9Record';
import HistoryPage from './pages/HistoryPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <TestProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Login Route */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <DashboardPage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            {/* New Test 9-Step Workflow */}
            <Route
              path="/new-test"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <NewTestLayout />
                  </MainLayout>
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/new-test/kit" replace />} />
              <Route path="kit" element={<Step1Kit />} />
              <Route path="category" element={<Step2Category />} />
              <Route path="sample" element={<Step3Sample />} />
              <Route path="kit-details" element={<Step4KitDetails />} />
              <Route path="instructions" element={<Step5Instructions />} />
              <Route path="camera" element={<Step6Camera />} />
              <Route path="analysis" element={<Step7Analysis />} />
              <Route path="result" element={<Step8Result />} />
              <Route path="record" element={<Step9Record />} />
            </Route>

            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <HistoryPage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <ProfilePage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <AdminPage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            {/* Default Catch-all redirect */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </TestProvider>
    </AuthProvider>
  );
}

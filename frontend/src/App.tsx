import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { DashboardPage } from './pages/DashboardPage';
import { SessionsPage } from './pages/SessionsPage';
import { SettingsPage } from './pages/SettingsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { getBackendStatus, BackendStatusResponse } from './services/api';

export const App: React.FC = () => {
  const [backendStatus, setBackendStatus] = useState<BackendStatusResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function pollStatus() {
      try {
        const status = await getBackendStatus();
        if (isMounted) {
          setBackendStatus(status);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setBackendStatus(null);
          setIsLoading(false);
        }
      }
    }

    pollStatus();
    const interval = setInterval(pollStatus, 10000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="min-h-screen bg-background text-slate-100 flex flex-col">
          <Header backendStatus={backendStatus} isLoading={isLoading} />
          <div className="flex-1 flex">
            <Sidebar />
            <main className="flex-1 p-8 overflow-y-auto max-w-7xl mx-auto w-full">
              <Routes>
                <Route path="/" element={<DashboardPage backendStatus={backendStatus} />} />
                <Route path="/sessions" element={<SessionsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { CommandPaletteModal } from './components/common/CommandPaletteModal';
import { ToastProvider } from './context/ToastContext';
import { DashboardPage } from './pages/DashboardPage';
import { SessionsPage } from './pages/SessionsPage';
import { SettingsPage } from './pages/SettingsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { getBackendStatus, BackendStatusResponse, ApiError } from './services/api';

const MainLayout: React.FC = () => {
  const [backendStatus, setBackendStatus] = useState<BackendStatusResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [prefilledGoal, setPrefilledGoal] = useState<string>('');

  useEffect(() => {
    let isMounted = true;

    async function pollStatus() {
      try {
        const status = await getBackendStatus();
        if (isMounted) {
          setBackendStatus(status);
          setConnectionError(null);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setBackendStatus(null);
          if (err instanceof ApiError) {
            setConnectionError(err.message);
          } else {
            setConnectionError((err as Error).message);
          }
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

  // Global Cmd+K / Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-background text-slate-100 flex flex-col font-sans selection:bg-brand-500/20 selection:text-brand-300">
      <Header
        backendStatus={backendStatus}
        isLoading={isLoading}
        connectionError={connectionError}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />
      <div className="flex-1 flex">
        <Sidebar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto w-full">
          <Routes>
            <Route
              path="/"
              element={
                <DashboardPage
                  backendStatus={backendStatus}
                  connectionError={connectionError}
                  prefilledGoal={prefilledGoal}
                />
              }
            />
            <Route path="/sessions" element={<SessionsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>

      {/* Global Command Palette */}
      <CommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onDispatchSampleGoal={(sample) => setPrefilledGoal(sample)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <BrowserRouter>
          <MainLayout />
        </BrowserRouter>
      </ToastProvider>
    </ErrorBoundary>
  );
};

export default App;

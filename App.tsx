import React, { useState, useEffect } from 'react';
import { Home } from './views/Home';
import { Lobby } from './views/Lobby';
import { Meeting } from './views/Meeting';
import { Summary } from './views/Summary';
import { Login } from './views/Login';
import { Signup } from './views/Signup';
import { Settings } from './views/Settings';
import { AdminLogin } from './views/AdminLogin';
import { AdminPanel } from './views/AdminPanel';
import { AppView, UserSettings } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LOGIN);
  const [meetingId, setMeetingId] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  
  // App-wide state simulating User Context
  const [userSettings, setUserSettings] = useState<UserSettings>({
    displayName: 'کاربر مهمان',
    videoDeviceId: 'default',
    audioDeviceId: 'default',
    audioOutputId: 'default',
    videoEnabled: true,
    audioEnabled: true,
    theme: 'dark',
    lowDataMode: false,
  });

  const updateSettings = (updates: Partial<UserSettings>) => {
    setUserSettings(prev => ({ ...prev, ...updates }));
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setUserSettings(prev => ({ ...prev, displayName: 'مدیر سیستم' }));
    setCurrentView(AppView.HOME);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserSettings(prev => ({ ...prev, displayName: 'کاربر مهمان' }));
    setCurrentView(AppView.LOGIN);
  };

  const handleAdminLogin = () => {
    setIsAdmin(true);
    setCurrentView(AppView.ADMIN_PANEL);
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setCurrentView(AppView.LOGIN);
  };

  // Handle Theme
  useEffect(() => {
    const root = window.document.documentElement;
    if (userSettings.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [userSettings.theme]);

  // View Router
  const renderView = () => {
    switch (currentView) {
      case AppView.HOME:
        return (
          <Home 
            onChangeView={setCurrentView} 
            setMeetingId={setMeetingId} 
            isAuthenticated={isAuthenticated}
            userSettings={userSettings}
            updateSettings={updateSettings}
            onLogout={handleLogout}
          />
        );
      case AppView.LOGIN:
        return (
          <Login 
            onChangeView={setCurrentView}
            onLogin={handleLogin}
          />
        );
      case AppView.SIGNUP:
        return (
          <Signup 
            onChangeView={setCurrentView}
          />
        );
      case AppView.ADMIN_LOGIN:
        return (
          <AdminLogin 
            onChangeView={setCurrentView}
            onAdminLogin={handleAdminLogin}
          />
        );
      case AppView.ADMIN_PANEL:
        return (
          <AdminPanel 
            onChangeView={setCurrentView}
            userSettings={userSettings}
            updateSettings={updateSettings}
            onLogout={handleAdminLogout}
          />
        );
      case AppView.LOBBY:
        return (
          <Lobby 
            onChangeView={setCurrentView} 
            userSettings={userSettings}
            updateSettings={updateSettings}
            meetingId={meetingId}
          />
        );
      case AppView.MEETING:
        return (
          <Meeting 
            onChangeView={setCurrentView} 
            meetingId={meetingId}
            userSettings={userSettings}
          />
        );
      case AppView.SUMMARY:
        return (
          <Summary 
            onChangeView={setCurrentView} 
          />
        );
      case AppView.SETTINGS:
        return (
          <Settings 
            onChangeView={setCurrentView} 
            userSettings={userSettings}
            updateSettings={updateSettings}
          />
        );
      default:
        return (
          <Home 
            onChangeView={setCurrentView} 
            setMeetingId={setMeetingId} 
            isAuthenticated={isAuthenticated}
            userSettings={userSettings}
            updateSettings={updateSettings}
            onLogout={handleLogout}
          />
        );
    }
  };

  return (
    <>
      {renderView()}
    </>
  );
};

export default App;
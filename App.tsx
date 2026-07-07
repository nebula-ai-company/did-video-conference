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
import { Landing } from './views/Landing';
import { LandingFeatures } from './views/LandingFeatures';
import { LandingSecurity } from './views/LandingSecurity';
import { LandingContact } from './views/LandingContact';
import { AppView, UserSettings } from './types';

const App: React.FC = () => {
  // Check for deep-link ?room= param on initial load
  const [currentView, setCurrentView] = useState<AppView>(() => {
    const urlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    return urlParams.has('room') ? AppView.LOGIN : AppView.LANDING;
  });
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
    setCurrentView(AppView.LANDING);
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

  // Post-auth-resolution effect
  useEffect(() => {
    const urlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    const hasRoom = urlParams.has('room');
    if (!isAuthenticated && !isAdmin) {
      if (hasRoom) {
        if (currentView !== AppView.LOGIN && currentView !== AppView.SIGNUP) {
          setCurrentView(AppView.LOGIN);
        }
      } else {
        const publicViews = [
          AppView.LANDING,
          AppView.LANDING_FEATURES,
          AppView.LANDING_SECURITY,
          AppView.LANDING_CONTACT,
          AppView.LOGIN,
          AppView.SIGNUP,
          AppView.ADMIN_LOGIN
        ];
        if (!publicViews.includes(currentView)) {
          setCurrentView(AppView.LANDING);
        }
      }
    }
  }, [isAuthenticated, isAdmin, currentView]);

  // View Router
  const renderView = () => {
    switch (currentView) {
      case AppView.LANDING:
        return (
          <Landing 
            onChangeView={setCurrentView}
            userSettings={userSettings}
            updateSettings={updateSettings}
          />
        );
      case AppView.LANDING_FEATURES:
        return (
          <LandingFeatures 
            onChangeView={setCurrentView}
            userSettings={userSettings}
            updateSettings={updateSettings}
          />
        );
      case AppView.LANDING_SECURITY:
        return (
          <LandingSecurity 
            onChangeView={setCurrentView}
            userSettings={userSettings}
            updateSettings={updateSettings}
          />
        );
      case AppView.LANDING_CONTACT:
        return (
          <LandingContact 
            onChangeView={setCurrentView}
            userSettings={userSettings}
            updateSettings={updateSettings}
          />
        );
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
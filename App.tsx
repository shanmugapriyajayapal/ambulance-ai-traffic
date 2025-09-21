import React, { useState } from 'react';
import { Header } from './components/Header';
import { MoodCheckIn } from './components/MoodCheckIn';
import { Dashboard } from './components/Dashboard';
import { CopingTools } from './components/CopingTools';
import { ChatInterface } from './components/ChatInterface';
import { CrisisSupport } from './components/CrisisSupport';
import { WellnessProvider } from './context/WellnessContext';

type ActiveView = 'dashboard' | 'mood' | 'tools' | 'chat' | 'crisis';

function App() {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');

  const renderActiveView = () => {
    switch (activeView) {
      case 'mood':
        return <MoodCheckIn onComplete={() => setActiveView('dashboard')} />;
      case 'tools':
        return <CopingTools />;
      case 'chat':
        return <ChatInterface />;
      case 'crisis':
        return <CrisisSupport />;
      default:
        return <Dashboard onNavigate={setActiveView} />;
    }
  };

  return (
    <WellnessProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50">
        <Header activeView={activeView} onNavigate={setActiveView} />
        <main className="container mx-auto px-4 py-6 max-w-4xl">
          {renderActiveView()}
        </main>
      </div>
    </WellnessProvider>
  );
}

export default App;
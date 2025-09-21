import React from 'react';
import { Heart, MessageCircle, Settings, Shield, Sparkles, BarChart3 } from 'lucide-react';

type ActiveView = 'dashboard' | 'mood' | 'tools' | 'chat' | 'crisis';

interface HeaderProps {
  activeView: ActiveView;
  onNavigate: (view: ActiveView) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeView, onNavigate }) => {
  const navItems = [
    { id: 'dashboard' as ActiveView, label: 'Dashboard', icon: BarChart3 },
    { id: 'mood' as ActiveView, label: 'Mood Check', icon: Heart },
    { id: 'tools' as ActiveView, label: 'Tools', icon: Sparkles },
    { id: 'chat' as ActiveView, label: 'Chat', icon: MessageCircle },
    { id: 'crisis' as ActiveView, label: 'Support', icon: Shield },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-teal-500 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
                WellnessBuddy
              </h1>
              <p className="text-sm text-gray-600">Your caring companion 💜</p>
            </div>
          </div>

          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeView === item.id
                      ? 'bg-purple-100 text-purple-700 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="md:hidden">
            <button className="p-2 rounded-lg bg-gray-100">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="md:hidden pb-4">
          <div className="flex space-x-1 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                    activeView === item.id
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-xs">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};
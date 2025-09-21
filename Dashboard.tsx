import React from 'react';
import { Heart, Sparkles, MessageCircle, TrendingUp, Calendar, Award } from 'lucide-react';
import { useWellness } from '../context/WellnessContext';

type ActiveView = 'dashboard' | 'mood' | 'tools' | 'chat' | 'crisis';

interface DashboardProps {
  onNavigate: (view: ActiveView) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { moodHistory, streak } = useWellness();

  const todaysMood = moodHistory[moodHistory.length - 1];
  const lastWeekMoods = moodHistory.slice(-7);

  const quickActions = [
    {
      title: 'Daily Check-in',
      description: 'How are you feeling today? 💭',
      icon: Heart,
      color: 'from-pink-500 to-red-400',
      action: () => onNavigate('mood'),
    },
    {
      title: 'Coping Tools',
      description: 'Breathing, mindfulness & more ✨',
      icon: Sparkles,
      color: 'from-purple-500 to-indigo-400',
      action: () => onNavigate('tools'),
    },
    {
      title: 'Chat with Buddy',
      description: 'Share what\'s on your mind 💜',
      icon: MessageCircle,
      color: 'from-teal-500 to-blue-400',
      action: () => onNavigate('chat'),
    },
  ];

  const motivationalMessages = [
    "You're doing great by taking care of your mental health! 🌟",
    "Every small step counts. You're stronger than you know. 💪",
    "It's okay to have difficult days. You're not alone. 🤗",
    "Remember: progress isn't always linear, and that's perfectly fine! 📈",
  ];

  const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Welcome back! 👋</h2>
            <p className="text-gray-600 mt-1">{new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
          </div>
          <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-teal-100 rounded-full px-4 py-2">
            <Award className="w-5 h-5 text-purple-600" />
            <span className="font-semibold text-purple-600">{streak} day streak!</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
          <p className="text-gray-700 text-sm leading-relaxed">{randomMessage}</p>
        </div>
      </div>

      {/* Today's Mood */}
      {todaysMood && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Today's Mood</h3>
          <div className="flex items-center space-x-4">
            <span className="text-4xl">{todaysMood.emoji}</span>
            <div>
              <p className="font-medium text-gray-800 capitalize">{todaysMood.feeling}</p>
              <p className="text-sm text-gray-600">Logged at {todaysMood.time}</p>
            </div>
          </div>
          {todaysMood.note && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">"{todaysMood.note}"</p>
            </div>
          )}
        </div>
      )}

      {/* Mood Trend */}
      {lastWeekMoods.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-5 h-5 text-teal-600" />
            <h3 className="text-lg font-semibold text-gray-800">This Week's Journey</h3>
          </div>
          <div className="flex items-center justify-between space-x-2">
            {lastWeekMoods.map((mood, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl mb-1">{mood.emoji}</div>
                <div className="text-xs text-gray-500">
                  {new Date(mood.date).toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              onClick={action.action}
              className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100 hover:shadow-md transition-all duration-200 text-left group"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{action.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{action.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
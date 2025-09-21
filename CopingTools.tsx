import React, { useState } from 'react';
import { Wind, Brain, PenTool, Sparkles, Play, Pause, RotateCcw } from 'lucide-react';

export const CopingTools: React.FC = () => {
  const [activeBreathing, setActiveBreathing] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathingTimer, setBreathingTimer] = useState<NodeJS.Timeout | null>(null);

  const startBreathingExercise = () => {
    setActiveBreathing(true);
    cycleBreathing();
  };

  const stopBreathingExercise = () => {
    setActiveBreathing(false);
    if (breathingTimer) {
      clearTimeout(breathingTimer);
      setBreathingTimer(null);
    }
    setBreathingPhase('inhale');
  };

  const cycleBreathing = () => {
    const phases = [
      { phase: 'inhale' as const, duration: 4000 },
      { phase: 'hold' as const, duration: 4000 },
      { phase: 'exhale' as const, duration: 6000 },
    ];
    
    let currentIndex = 0;
    
    const nextPhase = () => {
      setBreathingPhase(phases[currentIndex].phase);
      
      const timer = setTimeout(() => {
        currentIndex = (currentIndex + 1) % phases.length;
        if (activeBreathing) nextPhase();
      }, phases[currentIndex].duration);
      
      setBreathingTimer(timer);
    };
    
    nextPhase();
  };

  React.useEffect(() => {
    if (!activeBreathing && breathingTimer) {
      clearTimeout(breathingTimer);
    }
  }, [activeBreathing, breathingTimer]);

  const affirmations = [
    "I am worthy of love and kindness 💕",
    "This feeling will pass, and I will be okay 🌈",
    "I am stronger than I realize 💪",
    "I choose to be patient with myself today 🌸",
    "Every breath brings me peace ✨",
    "I am enough, just as I am 🌟",
  ];

  const [currentAffirmation, setCurrentAffirmation] = useState(affirmations[0]);

  const generateNewAffirmation = () => {
    const newAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
    setCurrentAffirmation(newAffirmation);
  };

  const mindfulnessExercises = [
    {
      title: "5-4-3-2-1 Grounding",
      description: "Notice 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste.",
    },
    {
      title: "Body Scan",
      description: "Start at your toes and slowly notice each part of your body, releasing tension as you go.",
    },
    {
      title: "Mindful Breathing",
      description: "Focus only on your breath. When your mind wanders, gently bring it back to breathing.",
    },
  ];

  const journalPrompts = [
    "What am I grateful for today?",
    "What challenge did I overcome recently?",
    "What would I tell a friend who was feeling like I do right now?",
    "What small thing brought me joy today?",
    "What am I looking forward to?",
    "What strength do I have that I sometimes forget about?",
  ];

  const [currentPrompt, setCurrentPrompt] = useState(journalPrompts[0]);

  const generateNewPrompt = () => {
    const newPrompt = journalPrompts[Math.floor(Math.random() * journalPrompts.length)];
    setCurrentPrompt(newPrompt);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Coping Tools ✨</h2>
        <p className="text-gray-600">Simple, effective techniques to help you feel better</p>
      </div>

      {/* Breathing Exercise */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-teal-500 rounded-full flex items-center justify-center">
            <Wind className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Breathing Exercise</h3>
        </div>
        
        <div className="text-center">
          <div className={`w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-400 to-teal-500 flex items-center justify-center transition-transform duration-1000 ${
            activeBreathing ? (
              breathingPhase === 'inhale' ? 'scale-125' : 
              breathingPhase === 'hold' ? 'scale-125' : 
              'scale-100'
            ) : 'scale-100'
          }`}>
            <span className="text-white font-semibold text-lg capitalize">
              {activeBreathing ? breathingPhase : 'Ready'}
            </span>
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-600">
              {activeBreathing ? 
                `${breathingPhase === 'inhale' ? 'Breathe in slowly...' : 
                  breathingPhase === 'hold' ? 'Hold your breath...' : 
                  'Breathe out slowly...'}`
                : 'Click start for a calming 4-4-6 breathing pattern'
              }
            </p>
            
            <div className="flex space-x-3 justify-center">
              {!activeBreathing ? (
                <button
                  onClick={startBreathingExercise}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-400 to-teal-500 text-white rounded-lg hover:shadow-md transition-all duration-200"
                >
                  <Play className="w-4 h-4" />
                  <span>Start</span>
                </button>
              ) : (
                <button
                  onClick={stopBreathingExercise}
                  className="flex items-center space-x-2 px-6 py-3 bg-gray-500 text-white rounded-lg hover:shadow-md transition-all duration-200"
                >
                  <Pause className="w-4 h-4" />
                  <span>Stop</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mindfulness Exercises */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Mindfulness Exercises</h3>
        </div>
        
        <div className="grid gap-4">
          {mindfulnessExercises.map((exercise, index) => (
            <div key={index} className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">{exercise.title}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{exercise.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Affirmations */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Daily Affirmations</h3>
        </div>
        
        <div className="text-center">
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-6 mb-4">
            <p className="text-lg text-gray-800 leading-relaxed">{currentAffirmation}</p>
          </div>
          
          <button
            onClick={generateNewAffirmation}
            className="flex items-center space-x-2 mx-auto px-4 py-2 text-pink-600 hover:bg-pink-50 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>New Affirmation</span>
          </button>
        </div>
      </div>

      {/* Journaling Prompts */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full flex items-center justify-center">
            <PenTool className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Journaling Prompts</h3>
        </div>
        
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-4">
            <p className="text-gray-800 leading-relaxed">{currentPrompt}</p>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={generateNewPrompt}
              className="flex items-center space-x-2 px-4 py-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>New Prompt</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
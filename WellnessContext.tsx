import React, { createContext, useContext, useState, useEffect } from 'react';

interface MoodEntry {
  emoji: string;
  feeling: string;
  note: string;
  date: string;
  time: string;
}

interface WellnessContextType {
  moodHistory: MoodEntry[];
  streak: number;
  addMoodEntry: (entry: MoodEntry) => void;
}

const WellnessContext = createContext<WellnessContextType | undefined>(undefined);

export const useWellness = () => {
  const context = useContext(WellnessContext);
  if (!context) {
    throw new Error('useWellness must be used within a WellnessProvider');
  }
  return context;
};

export const WellnessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [streak, setStreak] = useState(0);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedMoods = localStorage.getItem('wellness-moods');
    const savedStreak = localStorage.getItem('wellness-streak');
    
    if (savedMoods) {
      setMoodHistory(JSON.parse(savedMoods));
    }
    if (savedStreak) {
      setStreak(parseInt(savedStreak, 10));
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('wellness-moods', JSON.stringify(moodHistory));
  }, [moodHistory]);

  useEffect(() => {
    localStorage.setItem('wellness-streak', streak.toString());
  }, [streak]);

  const addMoodEntry = (entry: MoodEntry) => {
    const today = new Date().toISOString().split('T')[0];
    const existingEntryIndex = moodHistory.findIndex(mood => mood.date === today);
    
    if (existingEntryIndex !== -1) {
      // Update existing entry for today
      const updatedHistory = [...moodHistory];
      updatedHistory[existingEntryIndex] = entry;
      setMoodHistory(updatedHistory);
    } else {
      // Add new entry
      setMoodHistory(prev => [...prev, entry]);
      
      // Calculate streak
      const sortedHistory = [...moodHistory, entry].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      
      let currentStreak = 1;
      const today = new Date();
      
      for (let i = 1; i < sortedHistory.length; i++) {
        const currentDate = new Date(sortedHistory[i].date);
        const previousDate = new Date(sortedHistory[i - 1].date);
        const dayDifference = Math.floor((previousDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (dayDifference === 1) {
          currentStreak++;
        } else {
          break;
        }
      }
      
      setStreak(currentStreak);
    }
  };

  const value = {
    moodHistory,
    streak,
    addMoodEntry,
  };

  return <WellnessContext.Provider value={value}>{children}</WellnessContext.Provider>;
};
import React, { useState } from 'react';
import { ArrowLeft, Heart } from 'lucide-react';
import { useWellness } from '../context/WellnessContext';

interface MoodCheckInProps {
  onComplete: () => void;
}

export const MoodCheckIn: React.FC<MoodCheckInProps> = ({ onComplete }) => {
  const { addMoodEntry } = useWellness();
  const [selectedMood, setSelectedMood] = useState<{emoji: string, feeling: string} | null>(null);
  const [note, setNote] = useState('');
  const [step, setStep] = useState(1);

  const moods = [
    { emoji: '😊', feeling: 'great', color: 'from-green-400 to-emerald-500' },
    { emoji: '🙂', feeling: 'good', color: 'from-teal-400 to-cyan-500' },
    { emoji: '😐', feeling: 'okay', color: 'from-yellow-400 to-orange-500' },
    { emoji: '😕', feeling: 'not great', color: 'from-orange-400 to-red-500' },
    { emoji: '😢', feeling: 'difficult', color: 'from-red-400 to-pink-500' },
  ];

  const handleMoodSelection = (mood: {emoji: string, feeling: string}) => {
    setSelectedMood(mood);
    setStep(2);
  };

  const handleSubmit = () => {
    if (selectedMood) {
      addMoodEntry({
        ...selectedMood,
        note: note.trim(),
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
      });
      onComplete();
    }
  };

  const getResponseMessage = () => {
    if (!selectedMood) return '';
    
    const responses = {
      'great': "That's wonderful! 🌟 Keep riding this positive wave!",
      'good': "I'm glad you're feeling good today! 💙",
      'okay': "Thanks for checking in 💜 Sometimes okay is perfectly fine.",
      'not great': "I hear you 🤗 Would you like some coping strategies to help?",
      'difficult': "I'm sorry you're having a tough time 💕 You're brave for reaching out."
    };
    
    return responses[selectedMood.feeling as keyof typeof responses];
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-purple-100 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-teal-500 text-white p-6">
          <div className="flex items-center space-x-3">
            <button onClick={onComplete} className="hover:bg-white/10 p-1 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2">
              <Heart className="w-6 h-6" />
              <h2 className="text-xl font-semibold">Daily Check-in</h2>
            </div>
          </div>
          <p className="mt-2 text-purple-100">How are you feeling right now?</p>
        </div>

        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Pick the emoji that matches your mood 💭
                </h3>
                <p className="text-gray-600 text-sm">
                  There's no right or wrong answer. Just be honest with yourself.
                </p>
              </div>

              <div className="grid grid-cols-5 gap-4">
                {moods.map((mood, index) => (
                  <button
                    key={index}
                    onClick={() => handleMoodSelection(mood)}
                    className="group relative p-6 rounded-xl border border-gray-200 hover:border-transparent hover:shadow-lg transition-all duration-200 bg-white hover:bg-gradient-to-r hover:from-purple-50 hover:to-teal-50"
                  >
                    <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-200">
                      {mood.emoji}
                    </div>
                    <p className="text-xs font-medium text-gray-600 capitalize">
                      {mood.feeling}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && selectedMood && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-6xl mb-4">{selectedMood.emoji}</div>
                <h3 className="text-xl font-semibold text-gray-800 capitalize mb-2">
                  Feeling {selectedMood.feeling}
                </h3>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6">
                  <p className="text-gray-700">{getResponseMessage()}</p>
                </div>
              </div>

              <div>
                <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
                  Want to share more? (Optional) 📝
                </label>
                <textarea
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="What's going through your mind today? This is a safe space to express yourself..."
                  className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  rows={4}
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-500 to-teal-500 text-white rounded-lg hover:shadow-md transition-all duration-200 font-medium"
                >
                  Complete Check-in
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
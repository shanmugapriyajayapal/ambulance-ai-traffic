import React, { useState, useRef, useEffect } from 'react';
import { Send, Heart } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'buddy';
  timestamp: Date;
}

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hey there! 💜 I'm WellnessBuddy, and I'm here to listen and support you. How are you feeling today?",
      sender: 'buddy',
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBuddyResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Crisis detection
    if (lowerMessage.includes('hurt myself') || 
        lowerMessage.includes('kill myself') || 
        lowerMessage.includes('suicide') || 
        lowerMessage.includes('end it all') ||
        lowerMessage.includes('don\'t want to live')) {
      return "I'm really concerned about your safety right now 💙 You deserve support and care. Please reach out to someone who can help: Call or text 988 (Suicide & Crisis Lifeline) or contact a trusted adult immediately. You're not alone, and there are people who want to help you through this.";
    }

    // Anxiety responses
    if (lowerMessage.includes('anxious') || 
        lowerMessage.includes('anxiety') || 
        lowerMessage.includes('worried') || 
        lowerMessage.includes('stress')) {
      const responses = [
        "I hear you 💙 Anxiety can feel overwhelming. Would you like to try a quick breathing exercise together?",
        "That sounds really stressful 💜 Remember that anxiety is temporary - you've gotten through difficult feelings before. Want to try some grounding techniques?",
        "I understand how tough anxiety can be 🤗 What helps you feel more grounded? We could try the 5-4-3-2-1 technique together."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Depression/sadness responses
    if (lowerMessage.includes('sad') || 
        lowerMessage.includes('depressed') || 
        lowerMessage.includes('down') || 
        lowerMessage.includes('hopeless')) {
      const responses = [
        "I'm sorry you're feeling this way 💕 Your feelings are valid. Sometimes just acknowledging how we feel is the first step. You're brave for reaching out.",
        "That sounds really hard 🤗 Depression can make everything feel heavy. Remember that you don't have to carry this alone. Small steps count too.",
        "I hear you, and I want you to know that your life has value 💜 Even when things feel dark, there can be light again. What's one tiny thing that might bring you a moment of comfort today?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Loneliness responses
    if (lowerMessage.includes('alone') || 
        lowerMessage.includes('lonely') || 
        lowerMessage.includes('isolated')) {
      const responses = [
        "Feeling alone can be really tough 💜 Even though I'm an AI, I want you to know that you're not truly alone. There are people who care about you, even if it doesn't feel that way right now.",
        "I hear you 🤗 Loneliness is painful, but it's temporary. You took a brave step by reaching out here. That shows strength.",
        "That sounds difficult 💙 Sometimes loneliness can feel overwhelming, but you're here talking with me, which means you're taking care of yourself. That matters."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // School/work stress
    if (lowerMessage.includes('school') || 
        lowerMessage.includes('exam') || 
        lowerMessage.includes('test') || 
        lowerMessage.includes('homework') ||
        lowerMessage.includes('work')) {
      const responses = [
        "School stress is so real! 📚 Remember that your worth isn't determined by grades. Want to talk about breaking down what feels overwhelming?",
        "That sounds like a lot of pressure 💙 You're doing your best, and that's what matters. Would some study techniques or stress management help?",
        "Academic stress can feel intense 💜 Remember to be kind to yourself. What's one small step you could take to feel more in control?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Positive responses
    if (lowerMessage.includes('good') || 
        lowerMessage.includes('great') || 
        lowerMessage.includes('happy') || 
        lowerMessage.includes('better')) {
      const responses = [
        "That's wonderful to hear! 🌟 I love that you're feeling good. What's contributing to this positive feeling?",
        "I'm so glad you're doing well! ✨ It's beautiful when we can appreciate the good moments. Keep soaking it in!",
        "That makes me happy too! 😊 Thanks for sharing your positive energy. You deserve all the good feelings!"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Default empathetic responses
    const defaultResponses = [
      "Thank you for sharing that with me 💜 I'm here to listen. Would you like to tell me more about what's going through your mind?",
      "I hear you 💙 Sometimes it helps just to put our thoughts into words. How are you taking care of yourself today?",
      "Thanks for trusting me with your feelings 🤗 That takes courage. What would be most helpful for you right now?",
      "I appreciate you opening up 💕 Your feelings matter. Is there anything specific you'd like support with?",
      "I'm glad you're here 💜 Talking about what's on your mind can be really helpful. What feels most important to share right now?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const buddyResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBuddyResponse(inputText),
        sender: 'buddy',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, buddyResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-purple-100 flex flex-col h-[600px]">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-teal-500 text-white p-4 rounded-t-2xl">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold">WellnessBuddy</h3>
            <p className="text-sm text-purple-100">Here to listen and support you 💜</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-purple-500 to-teal-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
              <p className={`text-xs mt-2 ${
                message.sender === 'user' ? 'text-purple-100' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share what's on your mind... 💭"
            className="flex-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            rows={1}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="px-4 py-3 bg-gradient-to-r from-purple-500 to-teal-500 text-white rounded-lg hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Remember: I'm here to support you, but I'm not a replacement for professional help when you need it 💜
        </p>
      </div>
    </div>
  );
};
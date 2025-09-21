import React from 'react';
import { Phone, MessageSquare, Globe, Heart, Shield, AlertTriangle } from 'lucide-react';

export const CrisisSupport: React.FC = () => {
  const crisisResources = [
    {
      name: "988 Suicide & Crisis Lifeline",
      description: "24/7 crisis support via phone or chat",
      phone: "988",
      website: "https://988lifeline.org",
      icon: Phone,
      color: "from-red-500 to-pink-500"
    },
    {
      name: "Crisis Text Line",
      description: "Text-based crisis support",
      phone: "Text HOME to 741741",
      website: "https://www.crisistextline.org",
      icon: MessageSquare,
      color: "from-blue-500 to-indigo-500"
    },
    {
      name: "The Trevor Project",
      description: "Crisis support for LGBTQ+ youth",
      phone: "1-866-488-7386",
      website: "https://www.thetrevorproject.org",
      icon: Heart,
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "RAINN Hotline",
      description: "Sexual assault support hotline",
      phone: "1-800-656-4673",
      website: "https://www.rainn.org",
      icon: Shield,
      color: "from-teal-500 to-blue-500"
    }
  ];

  const internationalResources = [
    { country: "Canada", number: "1-833-456-4566", name: "Talk Suicide Canada" },
    { country: "UK", number: "116 123", name: "Samaritans" },
    { country: "Australia", number: "13 11 14", name: "Lifeline Australia" },
    { country: "New Zealand", number: "1737", name: "1737 Need to Talk?" },
  ];

  const warningSigns = [
    "Talking about wanting to die or hurt oneself",
    "Feeling hopeless or having no reason to live",
    "Feeling trapped or in unbearable pain",
    "Talking about being a burden to others",
    "Increasing use of alcohol or drugs",
    "Withdrawing from family and friends",
    "Sleeping too little or too much",
    "Giving away prized possessions",
    "Taking risks that could lead to death"
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Crisis Support 🆘</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          If you're having thoughts of self-harm or suicide, please reach out for help immediately. 
          You deserve support, and there are people who want to help you through this.
        </p>
      </div>

      {/* Emergency Notice */}
      <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-6">
        <div className="flex items-start space-x-4">
          <AlertTriangle className="w-6 h-6 text-red-600 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-red-800 mb-2">Immediate Emergency</h3>
            <p className="text-red-700 leading-relaxed">
              If you're in immediate danger, please call <strong>911</strong> or go to your nearest emergency room. 
              Your safety is the most important thing right now.
            </p>
          </div>
        </div>
      </div>

      {/* Crisis Resources */}
      <div className="grid gap-6 md:grid-cols-2">
        {crisisResources.map((resource, index) => {
          const Icon = resource.icon;
          return (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${resource.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">{resource.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-800">{resource.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-gray-500" />
                      <a 
                        href={resource.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* International Resources */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">International Crisis Resources</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {internationalResources.map((resource, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-800">{resource.country}</span>
                <span className="text-sm text-gray-600">{resource.number}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{resource.name}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-600 mt-4">
          For more international resources, visit{' '}
          <a 
            href="https://findahelpline.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            findahelpline.com
          </a>
        </p>
      </div>

      {/* Warning Signs */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Warning Signs to Watch For</h3>
        <div className="grid gap-2 md:grid-cols-2">
          {warningSigns.map((sign, index) => (
            <div key={index} className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-sm text-gray-700">{sign}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800 leading-relaxed">
            If you notice these signs in yourself or someone else, it's important to seek help. 
            Reaching out is a sign of strength, not weakness. 💙
          </p>
        </div>
      </div>

      {/* Support Message */}
      <div className="bg-gradient-to-r from-purple-50 to-teal-50 rounded-2xl p-6 text-center">
        <Heart className="w-12 h-12 text-purple-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-800 mb-2">You Are Not Alone</h3>
        <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
          Your life has value and meaning. Even in the darkest moments, there is hope for brighter days ahead. 
          Professional counselors and crisis support specialists are trained to help you through difficult times. 
          Please don't hesitate to reach out – you deserve support and care. 💜
        </p>
      </div>
    </div>
  );
};
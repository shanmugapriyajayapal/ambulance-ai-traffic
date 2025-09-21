import React, { useState, useCallback } from 'react';
import TrafficIntersection from './components/TrafficIntersection';
import AIDetectionModule from './components/AIDetectionModule';
import ControlDashboard from './components/ControlDashboard';
import HospitalDashboard from './components/HospitalDashboard';
import { Zap, Shield, Brain } from 'lucide-react';

interface AmbulanceData {
  detected: boolean;
  lane: string;
  eta: number;
  timestamp: Date;
}

function App() {
  const [ambulanceData, setAmbulanceData] = useState<AmbulanceData | null>(null);
  const [signalOverride, setSignalOverride] = useState<string | null>(null);
  const [signalStatus, setSignalStatus] = useState({
    northSouth: 'red',
    eastWest: 'green'
  });
  const [isSystemActive, setIsSystemActive] = useState(true);

  const handleAmbulanceDetection = useCallback((lane: string, eta: number) => {
    const newAmbulanceData: AmbulanceData = {
      detected: true,
      lane,
      eta,
      timestamp: new Date()
    };
    
    setAmbulanceData(newAmbulanceData);
    setSignalOverride(lane);
    
    // Update signal status based on lane
    if (lane === 'north' || lane === 'south') {
      setSignalStatus({ northSouth: 'green', eastWest: 'red' });
    } else {
      setSignalStatus({ northSouth: 'red', eastWest: 'green' });
    }
    
    // Clear override after ambulance passes
    setTimeout(() => {
      setSignalOverride(null);
      setAmbulanceData(null);
    }, 10000);
  }, []);

  const handleAIDetection = useCallback((vehicleType: string, confidence: number, lane: string) => {
    if (vehicleType === 'ambulance' && confidence > 0.7) {
      const eta = Math.floor(Math.random() * 15) + 5; // 5-20 seconds
      handleAmbulanceDetection(lane, eta);
    }
  }, [handleAmbulanceDetection]);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">SmartTraffic AI</h1>
              <p className="text-sm text-gray-400">Intelligent Emergency Vehicle Priority System</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
              <Shield className="w-4 h-4" />
              System Active
            </div>
            <button 
              onClick={() => setIsSystemActive(!isSystemActive)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isSystemActive 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isSystemActive ? 'Stop System' : 'Start System'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {/* System Overview */}
        <div className="mb-8 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg p-6 border border-blue-500/20">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-8 h-8 text-blue-400" />
            <div>
              <h2 className="text-2xl font-bold">AI-Powered Emergency Response</h2>
              <p className="text-gray-300">Real-time ambulance detection and intelligent traffic signal control</p>
            </div>
          </div>
          
          {ambulanceData && ambulanceData.detected && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 animate-pulse">
              <div className="flex items-center gap-2 text-red-400 font-bold text-lg">
                <Zap className="w-5 h-5" />
                EMERGENCY PROTOCOL ACTIVE - AMBULANCE DETECTED IN {ambulanceData.lane.toUpperCase()} LANE
              </div>
            </div>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Traffic Intersection */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              Live Traffic Intersection
            </h3>
            <TrafficIntersection 
              onAmbulanceDetected={handleAmbulanceDetection}
              signalOverride={signalOverride}
            />
          </div>

          {/* AI Detection Module */}
          <div>
            <AIDetectionModule 
              onDetection={handleAIDetection}
              isActive={isSystemActive}
            />
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Control Dashboard */}
          <ControlDashboard 
            ambulanceData={ambulanceData}
            signalStatus={signalStatus}
          />

          {/* Hospital Dashboard */}
          <HospitalDashboard 
            ambulanceData={ambulanceData}
          />
        </div>

        {/* System Statistics */}
        <div className="mt-8 bg-gray-900 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">System Performance</h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">99.8%</div>
              <div className="text-sm text-gray-400">Detection Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">2.1s</div>
              <div className="text-sm text-gray-400">Avg Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">47%</div>
              <div className="text-sm text-gray-400">Time Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">156</div>
              <div className="text-sm text-gray-400">Lives Saved</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
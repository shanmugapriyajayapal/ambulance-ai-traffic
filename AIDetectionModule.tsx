import React, { useState, useEffect } from 'react';
import { Camera, CheckCircle, AlertCircle, Zap, Eye } from 'lucide-react';

interface AIDetectionModuleProps {
  onDetection: (vehicleType: string, confidence: number, lane: string) => void;
  isActive: boolean;
}

const AIDetectionModule: React.FC<AIDetectionModuleProps> = ({ onDetection, isActive }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [detectionStatus, setDetectionStatus] = useState<'idle' | 'scanning' | 'detected'>('idle');
  const [lastDetection, setLastDetection] = useState<{
    type: string;
    confidence: number;
    timestamp: Date;
    lane: string;
  } | null>(null);
  const [processingFrames, setProcessingFrames] = useState(0);

  useEffect(() => {
    if (isActive) {
      setIsScanning(true);
      setDetectionStatus('scanning');
      
      const scanInterval = setInterval(() => {
        setProcessingFrames(prev => (prev + 1) % 30);
        
        // Simulate ambulance detection with realistic probability
        if (Math.random() < 0.15 && detectionStatus === 'scanning') {
          const lanes = ['north', 'south', 'east', 'west'];
          const randomLane = lanes[Math.floor(Math.random() * lanes.length)];
          const confidence = Math.random() * 0.3 + 0.7; // 70-100% confidence
          
          setDetectionStatus('detected');
          setLastDetection({
            type: 'ambulance',
            confidence,
            timestamp: new Date(),
            lane: randomLane
          });
          
          onDetection('ambulance', confidence, randomLane);
          
          // Reset after 3 seconds
          setTimeout(() => {
            setDetectionStatus('idle');
            setIsScanning(false);
          }, 3000);
        }
      }, 200);

      return () => clearInterval(scanInterval);
    }
  }, [isActive, detectionStatus, onDetection]);

  const formatConfidence = (confidence: number) => {
    return `${(confidence * 100).toFixed(1)}%`;
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 text-white">
      <div className="flex items-center gap-3 mb-4">
        <Eye className="w-6 h-6 text-blue-400" />
        <h2 className="text-xl font-bold">AI Detection Module</h2>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          detectionStatus === 'detected' ? 'bg-red-500' : 
          detectionStatus === 'scanning' ? 'bg-yellow-500' : 'bg-gray-600'
        }`}>
          {detectionStatus.toUpperCase()}
        </div>
      </div>

      {/* Camera Feed Simulation */}
      <div className="relative bg-gray-800 rounded-lg mb-4 h-48 flex items-center justify-center overflow-hidden">
        {isScanning && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-pulse"></div>
        )}
        
        <Camera className={`w-16 h-16 ${isScanning ? 'text-blue-400 animate-pulse' : 'text-gray-500'}`} />
        
        {detectionStatus === 'scanning' && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-yellow-500 px-2 py-1 rounded text-xs">
            <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
            PROCESSING
          </div>
        )}

        {detectionStatus === 'detected' && lastDetection && (
          <div className="absolute inset-0 border-4 border-red-500 rounded-lg animate-pulse">
            <div className="absolute top-2 left-2 bg-red-500 px-3 py-1 rounded text-sm font-bold">
              AMBULANCE DETECTED
            </div>
            <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 rounded text-xs">
              Confidence: {formatConfidence(lastDetection.confidence)}
            </div>
          </div>
        )}

        {/* Processing indicator */}
        {isScanning && (
          <div className="absolute bottom-2 right-2 text-xs text-gray-400">
            Frame: {processingFrames}/30
          </div>
        )}
      </div>

      {/* Detection Statistics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-800 p-3 rounded">
          <div className="text-sm text-gray-400">Model</div>
          <div className="font-mono text-lg">YOLOv8-Emergency</div>
        </div>
        <div className="bg-gray-800 p-3 rounded">
          <div className="text-sm text-gray-400">Processing Speed</div>
          <div className="font-mono text-lg">30 FPS</div>
        </div>
      </div>

      {/* Last Detection Info */}
      {lastDetection && (
        <div className="bg-gray-800 p-4 rounded border-l-4 border-red-500">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="font-medium">Latest Detection</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-400">Vehicle:</span> {lastDetection.type.toUpperCase()}
            </div>
            <div>
              <span className="text-gray-400">Lane:</span> {lastDetection.lane.toUpperCase()}
            </div>
            <div>
              <span className="text-gray-400">Confidence:</span> {formatConfidence(lastDetection.confidence)}
            </div>
            <div>
              <span className="text-gray-400">Time:</span> {lastDetection.timestamp.toLocaleTimeString()}
            </div>
          </div>
        </div>
      )}

      {/* AI Processing Indicator */}
      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <Zap className={`w-4 h-4 ${isScanning ? 'text-yellow-400 animate-pulse' : 'text-gray-500'}`} />
          <span className="text-gray-400">
            {isScanning ? 'Neural network active' : 'Standby mode'}
          </span>
        </div>
        {detectionStatus === 'detected' && (
          <div className="text-green-400 font-medium animate-pulse">
            ✓ Emergency Vehicle Priority Activated
          </div>
        )}
      </div>
    </div>
  );
};

export default AIDetectionModule;
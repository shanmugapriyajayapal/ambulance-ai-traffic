import React, { useState, useEffect } from 'react';
import { 
  Monitor, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  Navigation,
  Zap,
  Activity
} from 'lucide-react';

interface ControlDashboardProps {
  ambulanceData: {
    detected: boolean;
    lane: string;
    eta: number;
    timestamp: Date;
  } | null;
  signalStatus: {
    northSouth: string;
    eastWest: string;
  };
}

const ControlDashboard: React.FC<ControlDashboardProps> = ({ 
  ambulanceData, 
  signalStatus 
}) => {
  const [systemAlerts, setSystemAlerts] = useState<Array<{
    id: string;
    type: 'warning' | 'success' | 'info';
    message: string;
    timestamp: Date;
  }>>([]);

  const [trafficMetrics, setTrafficMetrics] = useState({
    totalVehicles: 24,
    averageWaitTime: 45,
    emergencyResponses: 3,
    systemUptime: '99.8%'
  });

  useEffect(() => {
    if (ambulanceData && ambulanceData.detected) {
      const newAlert = {
        id: `alert-${Date.now()}`,
        type: 'warning' as const,
        message: `Emergency vehicle detected in ${ambulanceData.lane.toUpperCase()} lane. Priority signal activated.`,
        timestamp: new Date()
      };
      
      setSystemAlerts(prev => [newAlert, ...prev.slice(0, 4)]);
      
      // Update emergency response count
      setTrafficMetrics(prev => ({
        ...prev,
        emergencyResponses: prev.emergencyResponses + 1
      }));
    }
  }, [ambulanceData]);

  const getSignalStatusColor = (status: string) => {
    return status === 'green' ? 'text-green-500' : 'text-red-500';
  };

  const getSignalStatusBg = (status: string) => {
    return status === 'green' ? 'bg-green-500/20' : 'bg-red-500/20';
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 text-white">
      <div className="flex items-center gap-3 mb-6">
        <Monitor className="w-6 h-6 text-blue-400" />
        <h2 className="text-xl font-bold">Traffic Control Center</h2>
        <div className="ml-auto flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          SYSTEM ONLINE
        </div>
      </div>

      {/* Emergency Status */}
      {ambulanceData && ambulanceData.detected && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6 animate-pulse">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <span className="text-lg font-bold text-red-400">EMERGENCY PROTOCOL ACTIVE</span>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Lane:</span>
              <div className="font-mono text-lg">{ambulanceData.lane.toUpperCase()}</div>
            </div>
            <div>
              <span className="text-gray-400">ETA:</span>
              <div className="font-mono text-lg">{ambulanceData.eta}s</div>
            </div>
            <div>
              <span className="text-gray-400">Priority:</span>
              <div className="font-mono text-lg text-red-400">MAXIMUM</div>
            </div>
          </div>
        </div>
      )}

      {/* Traffic Signal Status */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Navigation className="w-5 h-5 text-blue-400" />
            <span className="font-medium">North-South Corridor</span>
          </div>
          <div className={`flex items-center gap-2 p-2 rounded ${getSignalStatusBg(signalStatus.northSouth)}`}>
            <div className={`w-3 h-3 rounded-full ${signalStatus.northSouth === 'green' ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
            <span className={`font-mono ${getSignalStatusColor(signalStatus.northSouth)}`}>
              {signalStatus.northSouth.toUpperCase()}
            </span>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Navigation className="w-5 h-5 text-blue-400 transform rotate-90" />
            <span className="font-medium">East-West Corridor</span>
          </div>
          <div className={`flex items-center gap-2 p-2 rounded ${getSignalStatusBg(signalStatus.eastWest)}`}>
            <div className={`w-3 h-3 rounded-full ${signalStatus.eastWest === 'green' ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
            <span className={`font-mono ${getSignalStatusColor(signalStatus.eastWest)}`}>
              {signalStatus.eastWest.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg p-3 text-center">
          <Activity className="w-5 h-5 text-blue-400 mx-auto mb-1" />
          <div className="text-2xl font-bold">{trafficMetrics.totalVehicles}</div>
          <div className="text-xs text-gray-400">Active Vehicles</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 text-center">
          <Clock className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
          <div className="text-2xl font-bold">{trafficMetrics.averageWaitTime}s</div>
          <div className="text-xs text-gray-400">Avg Wait Time</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 text-center">
          <Zap className="w-5 h-5 text-red-400 mx-auto mb-1" />
          <div className="text-2xl font-bold">{trafficMetrics.emergencyResponses}</div>
          <div className="text-xs text-gray-400">Emergency Events</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 text-center">
          <CheckCircle className="w-5 h-5 text-green-400 mx-auto mb-1" />
          <div className="text-2xl font-bold">{trafficMetrics.systemUptime}</div>
          <div className="text-xs text-gray-400">Uptime</div>
        </div>
      </div>

      {/* System Alerts */}
      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-400" />
          System Alerts
        </h3>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {systemAlerts.length > 0 ? (
            systemAlerts.map(alert => (
              <div 
                key={alert.id}
                className={`p-3 rounded-lg border-l-4 ${
                  alert.type === 'warning' ? 'bg-yellow-500/20 border-yellow-500' :
                  alert.type === 'success' ? 'bg-green-500/20 border-green-500' :
                  'bg-blue-500/20 border-blue-500'
                }`}
              >
                <div className="flex justify-between items-start">
                  <p className="text-sm">{alert.message}</p>
                  <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">
                    {alert.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-4">
              <CheckCircle className="w-8 h-8 mx-auto mb-2" />
              <p>All systems operating normally</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ControlDashboard;
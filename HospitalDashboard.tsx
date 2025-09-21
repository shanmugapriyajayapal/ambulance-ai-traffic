import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  MapPin, 
  Clock, 
  Users, 
  AlertCircle,
  CheckCircle2,
  Navigation,
  Phone
} from 'lucide-react';

interface HospitalDashboardProps {
  ambulanceData: {
    detected: boolean;
    lane: string;
    eta: number;
    timestamp: Date;
  } | null;
}

const HospitalDashboard: React.FC<HospitalDashboardProps> = ({ ambulanceData }) => {
  const [emergencyTeamStatus, setEmergencyTeamStatus] = useState<'standby' | 'preparing' | 'ready'>('standby');
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    message: string;
    timestamp: Date;
    type: 'info' | 'warning' | 'success';
  }>>([]);

  const [hospitalMetrics] = useState({
    availableBeds: 12,
    emergencyStaff: 8,
    avgResponseTime: '4.2 min',
    currentPatients: 23
  });

  useEffect(() => {
    if (ambulanceData && ambulanceData.detected) {
      setEmergencyTeamStatus('preparing');
      
      const notification = {
        id: `notif-${Date.now()}`,
        message: `Incoming ambulance detected. ETA: ${ambulanceData.eta} seconds. Prepare trauma bay.`,
        timestamp: new Date(),
        type: 'warning' as const
      };
      
      setNotifications(prev => [notification, ...prev.slice(0, 4)]);
      
      // Simulate team preparation
      setTimeout(() => {
        setEmergencyTeamStatus('ready');
        const readyNotification = {
          id: `notif-ready-${Date.now()}`,
          message: 'Emergency team assembled and ready for incoming patient.',
          timestamp: new Date(),
          type: 'success' as const
        };
        setNotifications(prev => [readyNotification, ...prev.slice(0, 4)]);
      }, 3000);
    }
  }, [ambulanceData]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'standby': return 'text-gray-400 bg-gray-500/20';
      case 'preparing': return 'text-yellow-400 bg-yellow-500/20';
      case 'ready': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      case 'success': return <CheckCircle2 className="w-4 h-4 text-green-400" />;
      default: return <AlertCircle className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 text-white">
      <div className="flex items-center gap-3 mb-6">
        <Heart className="w-6 h-6 text-red-400" />
        <h2 className="text-xl font-bold">City General Hospital</h2>
        <div className="ml-auto flex items-center gap-2 text-sm text-green-400">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          EMERGENCY READY
        </div>
      </div>

      {/* Emergency Team Status */}
      <div className={`p-4 rounded-lg border-2 mb-6 ${
        emergencyTeamStatus === 'ready' ? 'border-green-500 bg-green-500/20' :
        emergencyTeamStatus === 'preparing' ? 'border-yellow-500 bg-yellow-500/20' :
        'border-gray-600 bg-gray-800'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Users className="w-5 h-5" />
            Emergency Team Status
          </h3>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(emergencyTeamStatus)}`}>
            {emergencyTeamStatus.toUpperCase()}
          </div>
        </div>
        
        {ambulanceData && ambulanceData.detected && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-gray-400 text-sm">Incoming From:</span>
              <div className="font-mono text-lg">{ambulanceData.lane.toUpperCase()} Lane</div>
            </div>
            <div>
              <span className="text-gray-400 text-sm">Estimated Arrival:</span>
              <div className="font-mono text-lg text-yellow-400">{ambulanceData.eta} seconds</div>
            </div>
          </div>
        )}
      </div>

      {/* Hospital Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-400">Available Beds</span>
          </div>
          <div className="text-2xl font-bold text-green-400">{hospitalMetrics.availableBeds}</div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-400">Emergency Staff</span>
          </div>
          <div className="text-2xl font-bold text-purple-400">{hospitalMetrics.emergencyStaff}</div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-400">Avg Response</span>
          </div>
          <div className="text-xl font-bold text-yellow-400">{hospitalMetrics.avgResponseTime}</div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-4 h-4 text-red-400" />
            <span className="text-sm text-gray-400">Current Patients</span>
          </div>
          <div className="text-2xl font-bold text-red-400">{hospitalMetrics.currentPatients}</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-3 rounded-lg transition-colors">
          <Phone className="w-4 h-4" />
          Alert Trauma Team
        </button>
        <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg transition-colors">
          <Navigation className="w-4 h-4" />
          Track Ambulance
        </button>
      </div>

      {/* Notifications */}
      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-yellow-400" />
          Recent Notifications
        </h3>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map(notification => (
              <div 
                key={notification.id}
                className="p-3 bg-gray-800 rounded-lg border-l-4 border-gray-600"
              >
                <div className="flex items-start gap-2">
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1">
                    <p className="text-sm">{notification.message}</p>
                    <span className="text-xs text-gray-400">
                      {notification.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-4">
              <CheckCircle2 className="w-8 h-8 mx-auto mb-2" />
              <p>No recent emergency notifications</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;
import React, { useState, useEffect, useRef } from 'react';
import { Car, Truck, AlertTriangle, Clock } from 'lucide-react';

interface Vehicle {
  id: string;
  type: 'car' | 'ambulance';
  lane: 'north' | 'south' | 'east' | 'west';
  position: number;
  speed: number;
  waiting: boolean;
}

interface TrafficIntersectionProps {
  onAmbulanceDetected: (lane: string, eta: number) => void;
  signalOverride: string | null;
}

const TrafficIntersection: React.FC<TrafficIntersectionProps> = ({ 
  onAmbulanceDetected, 
  signalOverride 
}) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [signals, setSignals] = useState({
    northSouth: 'red',
    eastWest: 'green'
  });
  const [detectedAmbulance, setDetectedAmbulance] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const signalCycleRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize vehicles
  useEffect(() => {
    const initialVehicles: Vehicle[] = [
      { id: 'car1', type: 'car', lane: 'north', position: 80, speed: 1, waiting: false },
      { id: 'car2', type: 'car', lane: 'south', position: 70, speed: 1.2, waiting: false },
      { id: 'car3', type: 'car', lane: 'east', position: 85, speed: 0.8, waiting: false },
      { id: 'ambulance1', type: 'ambulance', lane: 'west', position: 95, speed: 2, waiting: false },
      { id: 'car4', type: 'car', lane: 'north', position: 90, speed: 1.1, waiting: false }
    ];
    setVehicles(initialVehicles);
  }, []);

  // Signal cycling logic
  useEffect(() => {
    if (!signalOverride) {
      signalCycleRef.current = setInterval(() => {
        setSignals(prev => ({
          northSouth: prev.northSouth === 'green' ? 'red' : 'green',
          eastWest: prev.eastWest === 'green' ? 'red' : 'green'
        }));
      }, 8000);
    }

    return () => {
      if (signalCycleRef.current) {
        clearInterval(signalCycleRef.current);
      }
    };
  }, [signalOverride]);

  // Handle signal override for ambulance
  useEffect(() => {
    if (signalOverride) {
      if (signalOverride === 'north' || signalOverride === 'south') {
        setSignals({ northSouth: 'green', eastWest: 'red' });
      } else if (signalOverride === 'east' || signalOverride === 'west') {
        setSignals({ northSouth: 'red', eastWest: 'green' });
      }
    }
  }, [signalOverride]);

  // Vehicle movement and ambulance detection
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setVehicles(prevVehicles => {
        return prevVehicles.map(vehicle => {
          let newPosition = vehicle.position;
          let waiting = false;
          
          // Check if vehicle should stop at intersection
          const shouldStop = () => {
            if (vehicle.position > 40 && vehicle.position < 60) {
              if ((vehicle.lane === 'north' || vehicle.lane === 'south') && signals.northSouth === 'red') {
                return true;
              }
              if ((vehicle.lane === 'east' || vehicle.lane === 'west') && signals.eastWest === 'red') {
                return true;
              }
            }
            return false;
          };

          if (!shouldStop()) {
            newPosition = vehicle.position - vehicle.speed;
            if (newPosition < -10) {
              newPosition = 100; // Reset position
            }
          } else {
            waiting = true;
          }

          // Ambulance detection logic
          if (vehicle.type === 'ambulance' && vehicle.position > 60 && vehicle.position < 80) {
            if (!detectedAmbulance) {
              setDetectedAmbulance(vehicle.lane);
              const eta = Math.round((vehicle.position - 30) / vehicle.speed);
              onAmbulanceDetected(vehicle.lane, eta);
            }
          }

          return {
            ...vehicle,
            position: newPosition,
            waiting
          };
        });
      });
    }, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [signals, detectedAmbulance, onAmbulanceDetected]);

  const getVehicleStyle = (vehicle: Vehicle) => {
    let transform = '';
    let left = '';
    let top = '';

    switch (vehicle.lane) {
      case 'north':
        left = '45%';
        top = `${vehicle.position}%`;
        transform = 'rotate(180deg)';
        break;
      case 'south':
        left = '52%';
        top = `${100 - vehicle.position}%`;
        break;
      case 'east':
        left = `${100 - vehicle.position}%`;
        top = '45%';
        transform = 'rotate(270deg)';
        break;
      case 'west':
        left = `${vehicle.position}%`;
        top = '52%';
        transform = 'rotate(90deg)';
        break;
    }

    return { left, top, transform };
  };

  const getSignalColor = (direction: 'northSouth' | 'eastWest', color: 'red' | 'green') => {
    const isActive = signals[direction] === color;
    if (color === 'red') {
      return isActive ? 'bg-red-500' : 'bg-red-200';
    } else {
      return isActive ? 'bg-green-500' : 'bg-green-200';
    }
  };

  return (
    <div className="relative w-full h-96 bg-gray-700 rounded-lg overflow-hidden">
      {/* Road Structure */}
      <div className="absolute inset-0">
        {/* Horizontal road */}
        <div className="absolute w-full h-16 bg-gray-600 top-1/2 transform -translate-y-1/2 border-t-2 border-b-2 border-yellow-400 border-dashed"></div>
        {/* Vertical road */}
        <div className="absolute h-full w-16 bg-gray-600 left-1/2 transform -translate-x-1/2 border-l-2 border-r-2 border-yellow-400 border-dashed"></div>
        {/* Intersection */}
        <div className="absolute w-16 h-16 bg-gray-600 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Traffic Lights */}
      {/* North */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-black p-1 rounded">
        <div className={`w-3 h-3 rounded-full mb-1 ${getSignalColor('northSouth', 'red')}`}></div>
        <div className={`w-3 h-3 rounded-full ${getSignalColor('northSouth', 'green')}`}></div>
      </div>
      
      {/* South */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black p-1 rounded">
        <div className={`w-3 h-3 rounded-full mb-1 ${getSignalColor('northSouth', 'red')}`}></div>
        <div className={`w-3 h-3 rounded-full ${getSignalColor('northSouth', 'green')}`}></div>
      </div>
      
      {/* East */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-black p-1 rounded">
        <div className={`w-3 h-3 rounded-full mb-1 ${getSignalColor('eastWest', 'red')}`}></div>
        <div className={`w-3 h-3 rounded-full ${getSignalColor('eastWest', 'green')}`}></div>
      </div>
      
      {/* West */}
      <div className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-black p-1 rounded">
        <div className={`w-3 h-3 rounded-full mb-1 ${getSignalColor('eastWest', 'red')}`}></div>
        <div className={`w-3 h-3 rounded-full ${getSignalColor('eastWest', 'green')}`}></div>
      </div>

      {/* Vehicles */}
      {vehicles.map(vehicle => (
        <div
          key={vehicle.id}
          className="absolute transition-all duration-100 ease-linear z-10"
          style={getVehicleStyle(vehicle)}
        >
          {vehicle.type === 'ambulance' ? (
            <div className="relative">
              <Truck className={`w-6 h-6 ${detectedAmbulance === vehicle.lane ? 'text-red-500 animate-pulse' : 'text-white'}`} />
              {detectedAmbulance === vehicle.lane && (
                <div className="absolute -top-6 -left-8 bg-red-500 text-white text-xs px-2 py-1 rounded animate-bounce">
                  DETECTED
                </div>
              )}
            </div>
          ) : (
            <Car className={`w-5 h-5 ${vehicle.waiting ? 'text-yellow-400' : 'text-blue-400'}`} />
          )}
        </div>
      ))}

      {/* Detection Alert */}
      {detectedAmbulance && (
        <div className="absolute top-4 right-4 bg-red-500 text-white p-3 rounded-lg animate-pulse flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          <div>
            <div className="font-bold">AMBULANCE DETECTED</div>
            <div className="text-sm">Lane: {detectedAmbulance.toUpperCase()}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrafficIntersection;
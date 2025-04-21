import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Application status constants
export const APPLICATION_STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed'
};

// AsyncStorage key
const APPLICATION_STATUS_KEY = 'application_status';

// Context type definition
type ApplicationStateContextType = {
  applicationStatus: string;
  setApplicationStatus: (status: string) => Promise<void>;
  isApplicationStarted: boolean;
  isApplicationCompleted: boolean;
};

// Create context with default values
const ApplicationStateContext = createContext<ApplicationStateContextType>({
  applicationStatus: APPLICATION_STATUS.NOT_STARTED,
  setApplicationStatus: async () => {},
  isApplicationStarted: false,
  isApplicationCompleted: false
});

// Provider props type
interface ApplicationStateProviderProps {
  children: ReactNode;
}

// Provider component
export const ApplicationStateProvider: React.FC<ApplicationStateProviderProps> = ({ children }) => {
  const [applicationStatus, setApplicationStatusState] = useState<string>(APPLICATION_STATUS.NOT_STARTED);
  
  // Load status from AsyncStorage on mount
  useEffect(() => {
    const loadApplicationStatus = async () => {
      try {
        const status = await AsyncStorage.getItem(APPLICATION_STATUS_KEY);
        if (status) {
          setApplicationStatusState(status);
        }
      } catch (error) {
        console.error('Error loading application status:', error);
      }
    };
    
    loadApplicationStatus();
  }, []);
  
  // Set status and save to AsyncStorage
  const setApplicationStatus = async (status: string) => {
    try {
      await AsyncStorage.setItem(APPLICATION_STATUS_KEY, status);
      setApplicationStatusState(status);
    } catch (error) {
      console.error('Error saving application status:', error);
    }
  };
  
  // Derived states
  const isApplicationStarted = applicationStatus !== APPLICATION_STATUS.NOT_STARTED;
  const isApplicationCompleted = applicationStatus === APPLICATION_STATUS.COMPLETED;
  
  return (
    <ApplicationStateContext.Provider 
      value={{ 
        applicationStatus, 
        setApplicationStatus,
        isApplicationStarted,
        isApplicationCompleted
      }}
    >
      {children}
    </ApplicationStateContext.Provider>
  );
};

// Custom hook to use the context
export const useApplicationState = () => {
  const context = useContext(ApplicationStateContext);
  if (!context) {
    throw new Error('useApplicationState must be used within an ApplicationStateProvider');
  }
  return context;
}; 
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockUserData } from '../data/user-mock-data';

export interface UserInfo {
  name: string;
  avatarImageUrl: string | null;
  creditScore: number;
  creditScoreStatus: 'good' | 'fair' | 'poor';
  lastUpdated: string;
  zcoins: {
    balance: number;
    cashValue: number;
    savingsAmount: number;
    vouchersCount: number;
    totalEarned: number;
  };
  positiveChange?: boolean;
  zetPlus: {
    isActive: boolean;
    activeSince: string | null;
    stats: {
      disputesRaised: number;
      coinsEarned: number;
      coinsValue: number;
      videosWatched: number;
    }
  };
}

interface UserContextType {
  userInfo: UserInfo;
  updateUserInfo: (info: Partial<UserInfo>) => void;
  updateZcoins: (zcoinInfo: Partial<UserInfo['zcoins']>) => void;
  updateZetPlus: (zetPlusInfo: Partial<UserInfo['zetPlus']>) => void;
  activateZetPlus: () => void;
}

// Use mock data as the default values
const UserContext = createContext<UserContextType>({
  userInfo: mockUserData,
  updateUserInfo: () => {},
  updateZcoins: () => {},
  updateZetPlus: () => {},
  activateZetPlus: () => {}
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>(mockUserData);

  const updateUserInfo = (info: Partial<UserInfo>) => {
    setUserInfo(prevInfo => ({
      ...prevInfo,
      ...info
    }));
  };

  const updateZcoins = (zcoinInfo: Partial<UserInfo['zcoins']>) => {
    setUserInfo(prevInfo => ({
      ...prevInfo,
      zcoins: {
        ...prevInfo.zcoins,
        ...zcoinInfo
      }
    }));
  };

  const updateZetPlus = (zetPlusInfo: Partial<UserInfo['zetPlus']>) => {
    setUserInfo(prevInfo => ({
      ...prevInfo,
      zetPlus: {
        ...prevInfo.zetPlus,
        ...zetPlusInfo
      }
    }));
  };

  const activateZetPlus = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short',
      year: 'numeric'
    });
    
    setUserInfo(prevInfo => ({
      ...prevInfo,
      zetPlus: {
        ...prevInfo.zetPlus,
        isActive: true,
        activeSince: formattedDate
      }
    }));
  };

  return (
    <UserContext.Provider value={{ userInfo, updateUserInfo, updateZcoins, updateZetPlus, activateZetPlus }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext); 
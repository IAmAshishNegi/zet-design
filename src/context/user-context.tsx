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
}

interface UserContextType {
  userInfo: UserInfo;
  updateUserInfo: (info: Partial<UserInfo>) => void;
  updateZcoins: (zcoinInfo: Partial<UserInfo['zcoins']>) => void;
}

// Use mock data as the default values
const UserContext = createContext<UserContextType>({
  userInfo: mockUserData,
  updateUserInfo: () => {},
  updateZcoins: () => {}
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

  return (
    <UserContext.Provider value={{ userInfo, updateUserInfo, updateZcoins }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext); 
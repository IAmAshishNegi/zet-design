import { UserInfo } from '../context/user-context';

/**
 * Mock user data for testing purposes
 */
export const mockUserData: UserInfo = {
  name: 'Ashish Negi',
  avatarImageUrl: null,
  creditScore: 690,
  creditScoreStatus: 'good',
  lastUpdated: '10 May',
  zcoins: {
    balance: 200,
    cashValue: 200,
    savingsAmount: 200,
    vouchersCount: 1,
    totalEarned: 20000
  },
  positiveChange: true
};

// Additional mock user profiles for testing different scenarios
export const mockUserProfiles = {
  newUser: {
    ...mockUserData,
    name: 'New User',
    creditScore: 680,
    creditScoreStatus: 'fair',
    zcoins: {
      balance: 100,
      cashValue: 10,
      savingsAmount: 0,
      vouchersCount: 0,
      totalEarned: 100
    }
  },
  premiumUser: {
    ...mockUserData,
    name: 'Premium User',
    creditScore: 820,
    creditScoreStatus: 'good',
    zcoins: {
      balance: 5000,
      cashValue: 500,
      savingsAmount: 2500,
      vouchersCount: 3,
      totalEarned: 50000
    }
  }
}; 
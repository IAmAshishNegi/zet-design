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
    balance: 4000,
    cashValue: 200,
    savingsAmount: 200,
    vouchersCount: 1,
    totalEarned: 20000
  },
  positiveChange: true,
  zetPlus: {
    isActive: false,
    activeSince: 'March, 2025',
    stats: {
      disputesRaised: 0,
      coinsEarned: 0,
      coinsValue: 0,
      videosWatched: 0
    }
  }
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
    },
    zetPlus: {
      isActive: true,
      activeSince: null,
      stats: {
        disputesRaised: 0,
        coinsEarned: 0,
        coinsValue: 0,
        videosWatched: 0
      }
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
    },
    zetPlus: {
      isActive: true,
      activeSince: '15 May 2023',
      stats: {
        disputesRaised: 3,
        coinsEarned: 400,
        coinsValue: 20,
        videosWatched: 4
      }
    }
  }
}; 
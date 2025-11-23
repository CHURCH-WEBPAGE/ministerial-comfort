import { create } from 'zustand';

interface UIStore {
  isNotificationBannerCollapsed: boolean;
  setNotificationBannerCollapsed: (collapsed: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isNotificationBannerCollapsed: false,
  setNotificationBannerCollapsed: (collapsed) =>
    set({ isNotificationBannerCollapsed: collapsed }),
}));


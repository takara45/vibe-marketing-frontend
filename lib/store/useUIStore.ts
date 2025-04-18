import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark" | "system";
export type SidebarState = "expanded" | "collapsed";
export type NotificationType = "success" | "error" | "warning" | "info";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  autoClose?: boolean;
  duration?: number;
}

interface UIState {
  // Theme
  theme: Theme;

  // Sidebar
  sidebarState: SidebarState;

  // Notifications
  notifications: Notification[];

  // Modal states
  activeModals: Record<string, boolean>;

  // Actions
  setTheme: (theme: Theme) => void;
  toggleSidebar: () => void;
  setSidebarState: (state: SidebarState) => void;
  addNotification: (notification: Omit<Notification, "id">) => string;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
  openModal: (modalId: string) => void;
  closeModal: (modalId: string) => void;
  toggleModal: (modalId: string) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      // Theme
      theme: "system",

      // Sidebar
      sidebarState: "expanded",

      // Notifications
      notifications: [],

      // Modal states
      activeModals: {},

      // Actions
      setTheme: (theme) => {
        set({ theme });

        // Apply theme to document
        if (theme === "dark") {
          document.documentElement.classList.add("dark");
        } else if (theme === "light") {
          document.documentElement.classList.remove("dark");
        } else if (theme === "system") {
          const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
            .matches
            ? "dark"
            : "light";
          if (systemTheme === "dark") {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        }
      },

      toggleSidebar: () => {
        const currentState = get().sidebarState;
        const newState = currentState === "expanded" ? "collapsed" : "expanded";
        set({ sidebarState: newState });
      },

      setSidebarState: (state) => {
        set({ sidebarState: state });
      },

      addNotification: (notification) => {
        const id = `notification-${Date.now()}`;
        const newNotification: Notification = {
          ...notification,
          id,
          autoClose: notification.autoClose ?? true,
          duration: notification.duration ?? 5000,
        };

        set((state) => ({
          notifications: [...state.notifications, newNotification],
        }));

        // Auto-close notification if enabled
        if (newNotification.autoClose) {
          setTimeout(() => {
            get().removeNotification(id);
          }, newNotification.duration);
        }

        return id;
      },

      removeNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      },

      clearAllNotifications: () => {
        set({ notifications: [] });
      },

      openModal: (modalId) => {
        set((state) => ({
          activeModals: {
            ...state.activeModals,
            [modalId]: true,
          },
        }));
      },

      closeModal: (modalId) => {
        set((state) => ({
          activeModals: {
            ...state.activeModals,
            [modalId]: false,
          },
        }));
      },

      toggleModal: (modalId) => {
        set((state) => ({
          activeModals: {
            ...state.activeModals,
            [modalId]: !state.activeModals[modalId],
          },
        }));
      },
    }),
    {
      name: "ui-storage", // unique name for localStorage
      partialize: (state) => ({
        theme: state.theme,
        sidebarState: state.sidebarState,
      }),
    }
  )
);

import { create } from "zustand";

export interface Template {
  id: string;
  name: string;
  createdAt: string;
  preview: string;
  data: any;
}

interface AppState {
  templates: Template[];
  notifications: Notification[];
  addTemplate: (template: Omit<Template, "id" | "createdAt">) => void;
  removeTemplate: (id: string) => void;
  addNotification: (notification: Omit<Notification, "id">) => void;
  removeNotification: (id: string) => void;
}

interface Notification {
  id: string;
  type: "success" | "error" | "info";
  title: string;
  message: string;
}

export const useAppStore = create<AppState>((set) => ({
  templates: [],
  notifications: [],
  addTemplate: (template) =>
    set((state) => ({
      templates: [
        ...state.templates,
        {
          ...template,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        },
      ],
    })),
  removeTemplate: (id) =>
    set((state) => ({
      templates: state.templates.filter((t) => t.id !== id),
    })),
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        {
          ...notification,
          id: Date.now().toString(),
        },
      ],
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));

import React, { createContext, useContext, useState, ReactNode } from "react";

// User type
type User = {
  id: string;
  name: string;
};

// AppStore interface
interface AppStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

// AppContext creation with initial undefined value
const AppContext = createContext<AppStore | undefined>(undefined);

// Custom hook to use the AppContext
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}

// AppProvider component props interface
interface AppProviderProps {
  children: ReactNode;
}

// AppProvider component definition
export function AppProvider({ children }: AppProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const appStore: AppStore = {
    user,
    setUser,
  };

  return <AppContext.Provider value={appStore}>{children}</AppContext.Provider>;
}

// Export the context for use in other components
export default AppContext;

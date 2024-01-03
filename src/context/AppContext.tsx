import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useQuery, gql } from "@apollo/client";
import CircularProgress from "@mui/material/CircularProgress";
import {
  ContextGetUserById,
  ContextGetUserByIdVariables,
} from "../generated/ContextGetUserById";

// GraphQL query to fetch user by ID
const GET_USER_BY_ID_QUERY = gql`
  query ContextGetUserById($id: ID!) {
    user(id: $id) {
      id
      name
    }
  }
`;

// User type
type User = {
  id: string;
  name: string;
  // Add other user properties here
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

  const { loading, error } = useQuery<
    ContextGetUserById,
    ContextGetUserByIdVariables
  >(GET_USER_BY_ID_QUERY, {
    variables: { id: "65759851698d692b9fd6d097" },
    onCompleted: (data) => {
      if (data && data.user) {
        setUser(data.user);
      } else {
        setUser(null); // User not found, set to null
      }
    },
    onError: () => {
      setUser(null); // On error, set user to null
    },
    skip: user !== null, // Skip the query if user is already set
  });

  useEffect(() => {
    if (!loading && !error && !user) {
      // You can navigate to a 404 page or handle the "user not found" case here
    }
  }, [user, loading, error]);

  const appStore: AppStore = {
    user,
    setUser,
  };

  if (loading) {
    // Show a spinner while loading
    return <CircularProgress />;
  }

  return <AppContext.Provider value={appStore}>{children}</AppContext.Provider>;
}

// Export the context for use in other components
export default AppContext;

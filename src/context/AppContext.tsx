import React, {createContext, useContext, useState, ReactNode} from 'react';
// TODO

// Define the User type
type User = {
    id: string;
    name: string;
    // Add other user properties here
};

// Define the Question type
type Question = {
    id: string;
    title: string;
    content: string;
    // Add other question properties here
};

// Define the shape of your custom store
interface AppStore {
    user: User | null;
    setUser: (user: User | null) => void;
    question: Question | null;
    setQuestion: (question: Question | null) => void;
}

// Create the context with an initial undefined value
const AppContext = createContext<AppStore | undefined>(undefined);

// Create a custom hook to access the context
export function useAppContext () {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
}

// Create a provider component to wrap your app
interface AppProviderProps {
    children: ReactNode;
}

export function AppProvider ({children}: AppProviderProps) {
    // Define your custom store state and functions for user
    const [ user, setUser ] = useState<User | null>(null);

    // Define your custom store state and functions for question
    const [ question, setQuestion ] = useState<Question | null>(null);

    // You can add more state and functions as needed

    // Provide the custom store via context
    const appStore: AppStore = {
        user,
        setUser,
        question,
        setQuestion,
        // Add more properties and methods here
    };

    return <AppContext.Provider value={appStore}>{children}</AppContext.Provider>;
}

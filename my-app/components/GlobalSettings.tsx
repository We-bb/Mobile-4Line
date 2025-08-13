import { createContext, ReactNode, useContext, useState } from "react";

// Define the shape of global settings
interface GlobalSettings {
  colorBlindMode: boolean; // toggle for color-blind friendly mode
  setColorBlindMode: (value: boolean) => void; // setter function
  themeSetter: boolean; // dark mode: true = dark, false = light
  setThemeSetter: (value: boolean) => void; // setter function
}

// Create the context (initially undefined)
const GlobalSettingsContext = createContext<GlobalSettings | undefined>(undefined);

// Provider component to wrap the app and provide global settings
export const GlobalSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [colorBlindMode, setColorBlindMode] = useState(false);
  const [themeSetter, setThemeSetter] = useState(true); // default to dark mode

  return (
    <GlobalSettingsContext.Provider
      value={{ colorBlindMode, setColorBlindMode, themeSetter, setThemeSetter }}
    >
      {children}
    </GlobalSettingsContext.Provider>
  );
};

// Custom hook to access global settings from any component
export const useGlobalSettings = () => {
  const context = useContext(GlobalSettingsContext);
  if (!context) {
    throw new Error("useGlobalSettings must be used within GlobalSettingsProvider");
  }
  return context;
};

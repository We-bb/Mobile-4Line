import { createContext, ReactNode, useContext, useState } from "react";

interface GlobalSettings {
  colorBlindMode: boolean;
  setColorBlindMode: (value: boolean) => void;
  themeSetter: boolean;
  setThemeSetter: (value: boolean) => void;
}

const GlobalSettingsContext = createContext<GlobalSettings | undefined>(undefined);

export const GlobalSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [colorBlindMode, setColorBlindMode] = useState(false);
  const [themeSetter, setThemeSetter] = useState(false); // false = light, true = dark

  return (
    <GlobalSettingsContext.Provider value={{ colorBlindMode, setColorBlindMode, themeSetter, setThemeSetter }}>
      {children}
    </GlobalSettingsContext.Provider>
  );
};

export const useGlobalSettings = () => {
  const context = useContext(GlobalSettingsContext);
  if (!context) {
    throw new Error("useGlobalSettings must be used within GlobalSettingsProvider");
  }
  return context;
};

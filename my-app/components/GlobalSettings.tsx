import React, { createContext, useContext, useState, ReactNode } from "react";

interface GlobalSettings {
  colorBlindMode: boolean;
  setColorBlindMode: (value: boolean) => void;
}

const GlobalSettingsContext = createContext<GlobalSettings | undefined>(undefined);

export const GlobalSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [colorBlindMode, setColorBlindMode] = useState(false);

  return (
    <GlobalSettingsContext.Provider value={{ colorBlindMode, setColorBlindMode }}>
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

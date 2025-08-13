import { useGlobalSettings } from "./GlobalSettings";

// Hook to provide theme-based colors
export function useThemeColors() {
  const { themeSetter } = useGlobalSettings(); // false = light mode, true = dark mode

  return {
    background: themeSetter ? "#0b1a2b" : "#fff", // main background color
    card: themeSetter ? "#2c2f45" : "#e5e5e5",    // card or panel background
    text: themeSetter ? "white" : "#0b1a2b",      // primary text color
    accent: "#fca311",                             // accent color (buttons, highlights)
    error: "#d62828",                              // error color
    border: themeSetter ? "#333" : "#ccc",        // border color
    placeholder: themeSetter ? "#aaa" : "#888",   // input placeholder text
  };
}

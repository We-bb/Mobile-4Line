import { useGlobalSettings } from "./GlobalSettings";

export function useThemeColors() {
  const { themeSetter } = useGlobalSettings();
  // false = light, true = dark
  return {
    background: themeSetter ? "#0b1a2b" : "#fff",
    card: themeSetter ? "#2c2f45" : "#e5e5e5",
    text: themeSetter ? "white" : "#0b1a2b",
    accent: "#fca311",
    error: "#d62828",
    border: themeSetter ? "#333" : "#ccc",
    placeholder: themeSetter ? "#aaa" : "#888",
  };
}

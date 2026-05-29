import { createContext, useContext, type ParentProps } from "solid-js";
import { createColorSchemeStore, type ColorSchemeStore } from "./color-scheme-store";

const ColorSchemeContext = createContext<ColorSchemeStore>();

export function ColorSchemeProvider(
  props: ParentProps & { store: ColorSchemeStore },
) {
  return (
    <ColorSchemeContext.Provider value={props.store}>{props.children}</ColorSchemeContext.Provider>
  );
}

export function useColorScheme(): ColorSchemeStore {
  const ctx = useContext(ColorSchemeContext);
  if (!ctx) throw new Error("useColorScheme requires ColorSchemeProvider");
  return ctx;
}

export { createColorSchemeStore };

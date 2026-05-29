import { createSignal, onMount, type Accessor } from "solid-js";
import {
  applyColorScheme,
  getStoredColorScheme,
  persistColorScheme,
  resolveEffectiveColorScheme,
  type ColorSchemePreference,
} from "./color-scheme";

export type ColorSchemeStore = {
  preference: Accessor<ColorSchemePreference>;
  effective: Accessor<"light" | "dark">;
  setPreference: (mode: ColorSchemePreference) => void;
};

export function createColorSchemeStore(
  initial?: ColorSchemePreference,
): ColorSchemeStore {
  const [preference, setPreferenceSignal] = createSignal<ColorSchemePreference>(
    initial ?? getStoredColorScheme(),
  );

  const effective = () => resolveEffectiveColorScheme(preference());

  const setPreference = (mode: ColorSchemePreference) => {
    setPreferenceSignal(mode);
    persistColorScheme(mode);
    applyColorScheme(mode);
  };

  onMount(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = () => {
      if (preference() === "auto") applyColorScheme("auto");
    };
    media.addEventListener("change", onSystemChange);
    return () => media.removeEventListener("change", onSystemChange);
  });

  return { preference, effective, setPreference };
}

export type ColorSchemePreference = "auto" | "light" | "dark";

export const COLOR_SCHEME_STORAGE_KEY = "code-lens-color-scheme";

export function getStoredColorScheme(): ColorSchemePreference {
  if (typeof localStorage === "undefined") return "auto";
  const value = localStorage.getItem(COLOR_SCHEME_STORAGE_KEY);
  if (value === "light" || value === "dark" || value === "auto") return value;
  return "auto";
}

export function resolveEffectiveColorScheme(
  preference: ColorSchemePreference,
): "light" | "dark" {
  if (preference === "auto") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return preference;
}

export function applyColorScheme(preference: ColorSchemePreference): "light" | "dark" {
  const effective = resolveEffectiveColorScheme(preference);
  document.documentElement.classList.toggle("dark", effective === "dark");
  document.documentElement.style.colorScheme = effective;
  document.documentElement.dataset.colorScheme = preference;
  return effective;
}

export function persistColorScheme(preference: ColorSchemePreference): void {
  localStorage.setItem(COLOR_SCHEME_STORAGE_KEY, preference);
}

/** Run before first paint — keep in sync with index.html inline script. */
export function bootstrapColorScheme(): ColorSchemePreference {
  const preference = getStoredColorScheme();
  applyColorScheme(preference);
  return preference;
}

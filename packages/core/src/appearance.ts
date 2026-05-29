/** Component appearance — independent of pedagogical color theme (earth, tropical, …). */
export type AppearancePreference = "auto" | "light" | "dark";

export type EffectiveAppearance = "light" | "dark";

export function resolveEffectiveAppearance(
  preference: AppearancePreference = "auto",
): EffectiveAppearance {
  if (preference === "auto") {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  }
  return preference;
}

/** Subscribe to system appearance changes when preference is auto. */
export function onSystemAppearanceChange(
  preference: () => AppearancePreference,
  callback: (effective: EffectiveAppearance) => void,
): () => void {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};

  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const handler = () => {
    if (preference() === "auto") {
      callback(media.matches ? "dark" : "light");
    }
  };
  media.addEventListener("change", handler);
  return () => media.removeEventListener("change", handler);
}

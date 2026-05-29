import type { SlotHighlight } from "@code-lens/vanilla";

export const SLOT_HIGHLIGHT_STORAGE_KEY = "code-lens-slot-highlight";

export function getStoredSlotHighlight(): SlotHighlight {
  if (typeof localStorage === "undefined") return "plain";
  const value = localStorage.getItem(SLOT_HIGHLIGHT_STORAGE_KEY);
  if (value === "plain" || value === "box") return value;
  return "plain";
}

export function persistSlotHighlight(mode: SlotHighlight): void {
  localStorage.setItem(SLOT_HIGHLIGHT_STORAGE_KEY, mode);
}

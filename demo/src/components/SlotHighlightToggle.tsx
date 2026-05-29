import { For } from "solid-js";
import { Button } from "~/components/ui/button";
import type { SlotHighlight } from "@code-lens/vanilla";
import { cn } from "~/lib/utils";

const MODES: { value: SlotHighlight; label: string; title: string }[] = [
  { value: "plain", label: "Plain", title: "Syntax-colored slots only" },
  { value: "box", label: "Box", title: "Rounded highlight on changeable tokens" },
];

type SlotHighlightToggleProps = {
  value: SlotHighlight;
  onChange: (mode: SlotHighlight) => void;
};

export function SlotHighlightToggle(props: SlotHighlightToggleProps) {
  return (
    <div
      class="inline-flex items-center rounded-md border border-border bg-muted/40 p-0.5"
      role="group"
      aria-label="Slot highlight"
    >
      <For each={MODES}>
        {(mode) => (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            class={cn(
              "h-8 rounded-sm px-2.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground",
              props.value === mode.value && "bg-background text-foreground shadow-sm",
            )}
            title={mode.title}
            aria-label={mode.label}
            aria-pressed={props.value === mode.value}
            onClick={() => props.onChange(mode.value)}
          >
            {mode.label}
          </Button>
        )}
      </For>
    </div>
  );
}

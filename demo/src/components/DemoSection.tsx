import { createSignal } from "solid-js";
import { CodeLens } from "@code-lens/solid";
import type { ThemesDocument } from "@code-lens/core";
import type { SlotHighlight } from "@code-lens/vanilla";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { SlotHighlightToggle } from "~/components/SlotHighlightToggle";
import { useColorScheme } from "~/lib/color-scheme-context";
import { getStoredSlotHighlight, persistSlotHighlight } from "~/lib/slot-highlight";
import { lensDocument, themes, ui } from "~/data";

type DemoSectionProps = {
  themes: ThemesDocument;
};

export function DemoSection(props: DemoSectionProps) {
  const colorScheme = useColorScheme();
  const [themeId, setThemeId] = createSignal(props.themes.defaultTheme);
  const [slotHighlight, setSlotHighlight] = createSignal<SlotHighlight>(getStoredSlotHighlight());

  const onSlotHighlightChange = (mode: SlotHighlight) => {
    setSlotHighlight(mode);
    persistSlotHighlight(mode);
  };

  return (
    <section id="demo" class="scroll-mt-8 space-y-4">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <h2 class="font-heading text-2xl font-semibold tracking-tight">Live demo</h2>
        <div class="flex flex-wrap items-center gap-4">
          <div class="flex items-center gap-2">
            <span class="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Slot highlight
            </span>
            <SlotHighlightToggle value={slotHighlight()} onChange={onSlotHighlightChange} />
          </div>
          <div class="flex items-center gap-2">
            <span class="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Color theme
            </span>
            <Select
              value={themeId()}
              onChange={setThemeId}
              options={Object.keys(props.themes.themes)}
              itemComponent={(itemProps) => (
                <SelectItem item={itemProps.item}>
                  {props.themes.themes[itemProps.item.rawValue].label}
                </SelectItem>
              )}
            >
              <SelectTrigger class="h-9 w-44 font-mono text-xs">
                <SelectValue<string>>
                  {(state) => props.themes.themes[state.selectedOption()].label}
                </SelectValue>
              </SelectTrigger>
              <SelectContent />
            </Select>
          </div>
        </div>
      </div>
      <p class="text-sm text-muted-foreground">
        Desktop: hover lens tabs to preview (glass indicator slides). Touch: tap lens tabs — the code
        panel stays selectable for copy/paste. Panel tint and syntax follow the color theme;
        light/dark appearance follows the header toggle. Use <strong class="font-normal">Plain</strong>{" "}
        / <strong class="font-normal">Box</strong> to toggle rounded highlights on changeable tokens.
      </p>
      <CodeLens
        document={lensDocument}
        themes={themes}
        ui={ui}
        themeId={themeId()}
        appearance={colorScheme.preference()}
        slotHighlight={slotHighlight()}
        class="code-lens-demo"
      />
    </section>
  );
}

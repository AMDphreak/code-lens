import { createSignal } from "solid-js";
import { CodeLens } from "@code-lens/solid";
import type { ThemesDocument } from "@code-lens/core";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { lensDocument, themes, ui } from "~/data";

type DemoSectionProps = {
  themes: ThemesDocument;
};

export function DemoSection(props: DemoSectionProps) {
  const [themeId, setThemeId] = createSignal(props.themes.defaultTheme);

  return (
    <section id="demo" class="scroll-mt-8 space-y-4">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <h2 class="font-heading text-2xl font-semibold tracking-tight">Live demo</h2>
        <div class="flex items-center gap-2">
          <span class="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Color scheme
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
      <p class="text-sm text-muted-foreground">
        Desktop: hover lens tabs (glass indicator slides). Touch: swipe the code panel. Each lens
        uses a distinct panel background from the active color scheme.
      </p>
      <CodeLens
        document={lensDocument}
        themes={themes}
        ui={ui}
        themeId={themeId()}
        class="code-lens-demo"
      />
    </section>
  );
}

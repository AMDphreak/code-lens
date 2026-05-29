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
import { useColorScheme } from "~/lib/color-scheme-context";
import { lensDocument, themes, ui } from "~/data";

type DemoSectionProps = {
  themes: ThemesDocument;
};

export function DemoSection(props: DemoSectionProps) {
  const colorScheme = useColorScheme();
  const [themeId, setThemeId] = createSignal(props.themes.defaultTheme);

  return (
    <section id="demo" class="scroll-mt-8 space-y-4">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <h2 class="font-heading text-2xl font-semibold tracking-tight">Live demo</h2>
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
      <p class="text-sm text-muted-foreground">
        Desktop: hover lens tabs to preview (glass indicator slides). Touch: tap lens tabs — the code
        panel stays selectable for copy/paste. Panel tint and syntax follow the color theme;
        light/dark appearance follows the header toggle (auto matches your system).
      </p>
      <CodeLens
        document={lensDocument}
        themes={themes}
        ui={ui}
        themeId={themeId()}
        appearance={colorScheme.preference()}
        class="code-lens-demo"
      />
    </section>
  );
}

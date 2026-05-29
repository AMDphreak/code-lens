import { For, createSignal, onCleanup, onMount } from "solid-js";
import { Button } from "~/components/ui/button";
import {
  applyColorScheme,
  getStoredColorScheme,
  persistColorScheme,
  type ColorSchemePreference,
} from "~/lib/color-scheme";
import { cn } from "~/lib/utils";

const MODES: {
  value: ColorSchemePreference;
  label: string;
  title: string;
}[] = [
  { value: "auto", label: "Auto", title: "Match system appearance" },
  { value: "light", label: "Light", title: "Light appearance" },
  { value: "dark", label: "Dark", title: "Dark appearance" },
];

function IconAuto(props: { class?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.75"
      stroke-linecap="round"
      stroke-linejoin="round"
      class={props.class}
      aria-hidden="true"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
    </svg>
  );
}

function IconSun(props: { class?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.75"
      stroke-linecap="round"
      stroke-linejoin="round"
      class={props.class}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function IconMoon(props: { class?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.75"
      stroke-linecap="round"
      stroke-linejoin="round"
      class={props.class}
      aria-hidden="true"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function ModeIcon(props: { mode: ColorSchemePreference; class?: string }) {
  if (props.mode === "auto") return <IconAuto class={props.class} />;
  if (props.mode === "light") return <IconSun class={props.class} />;
  return <IconMoon class={props.class} />;
}

export function ColorSchemeToggle() {
  const [preference, setPreference] = createSignal<ColorSchemePreference>("auto");

  onMount(() => {
    setPreference(getStoredColorScheme());

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = () => {
      if (preference() === "auto") applyColorScheme("auto");
    };
    media.addEventListener("change", onSystemChange);
    onCleanup(() => media.removeEventListener("change", onSystemChange));
  });

  const select = (mode: ColorSchemePreference) => {
    setPreference(mode);
    persistColorScheme(mode);
    applyColorScheme(mode);
  };

  return (
    <div
      class="inline-flex items-center rounded-md border border-border bg-muted/40 p-0.5"
      role="group"
      aria-label="Color scheme"
    >
      <For each={MODES}>
        {(mode) => (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            class={cn(
              "size-8 rounded-sm text-muted-foreground hover:text-foreground",
              preference() === mode.value && "bg-background text-foreground shadow-sm",
            )}
            title={mode.title}
            aria-label={mode.label}
            aria-pressed={preference() === mode.value}
            onClick={() => select(mode.value)}
          >
            <ModeIcon mode={mode.value} class="size-4" />
          </Button>
        )}
      </For>
    </div>
  );
}

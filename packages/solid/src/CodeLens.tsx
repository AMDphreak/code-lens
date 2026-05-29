import { createEffect, createSignal, onCleanup, onMount } from "solid-js";
import type { AppearancePreference, LensBlockDocument, ThemesDocument, UiDocument } from "@code-lens/core";
import {
  attachCodeLens,
  detachCodeLens,
  patchCodeLensTheme,
  type CodeLensElement,
} from "@code-lens/vanilla";

export type CodeLensProps = {
  document: LensBlockDocument;
  themes: ThemesDocument;
  ui: UiDocument;
  themeId?: string;
  appearance?: AppearancePreference;
  class?: string;
};

/** Official SolidJS component — wraps shared `<code-lens>` runtime. */
export function CodeLens(props: CodeLensProps) {
  let host!: HTMLDivElement;
  const [el, setEl] = createSignal<CodeLensElement | undefined>();

  onMount(() => {
    const node = attachCodeLens(host, {
      document: props.document,
      themes: props.themes,
      ui: props.ui,
      themeId: props.themeId,
      appearance: props.appearance ?? "auto",
    });
    setEl(node);
    onCleanup(() => detachCodeLens(host));
  });

  createEffect(() => {
    const node = el();
    if (!node) return;
    props.document;
    props.themes;
    props.ui;
    node.configure({
      document: props.document,
      themes: props.themes,
      ui: props.ui,
      themeId: props.themeId,
      appearance: props.appearance ?? "auto",
    });
  });

  createEffect(() => {
    const node = el();
    if (!node) return;
    patchCodeLensTheme(node, {
      themeId: props.themeId,
      appearance: props.appearance ?? "auto",
    });
  });

  return <div ref={host} class={props.class ?? "code-lens-host"} />;
}

export { registerCodeLens, createCodeLens } from "@code-lens/vanilla";
export type { CodeLensElement, CodeLensConfig } from "@code-lens/vanilla";

export {
  collectVariableSlots,
  parseLensBlock,
  parseThemes,
  parseUi,
} from "@code-lens/core";

export type {
  AppearancePreference,
  LensBlockDocument,
  LensDefinition,
  ThemesDocument,
  UiDocument,
} from "@code-lens/core";

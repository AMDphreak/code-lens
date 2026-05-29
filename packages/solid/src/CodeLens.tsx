import { createEffect, onCleanup, onMount } from "solid-js";
import type { LensBlockDocument, ThemesDocument, UiDocument } from "@code-lens/core";
import {
  createCodeLens,
  registerCodeLens,
  type CodeLensElement,
} from "@code-lens/vanilla";
import "@code-lens/vanilla/code-lens.css";

export type CodeLensProps = {
  document: LensBlockDocument;
  themes: ThemesDocument;
  ui: UiDocument;
  themeId?: string;
  class?: string;
};

/** SolidJS wrapper around the `<code-lens>` web component (full glass lens when supported). */
export function CodeLens(props: CodeLensProps) {
  let host!: HTMLDivElement;
  let el: CodeLensElement | undefined;

  onMount(() => {
    registerCodeLens();
    el = createCodeLens(
      {
        document: props.document,
        themes: props.themes,
        ui: props.ui,
        themeId: props.themeId,
      },
      props.themeId,
    );
    host.appendChild(el);
    onCleanup(() => el?.remove());
  });

  // Theme-only updates — avoid full configure() which resets lens state and re-measures widths.
  createEffect(() => {
    if (!el) return;
    const id = props.themeId;
    if (id) el.setAttribute("theme", id);
    else el.removeAttribute("theme");
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

export type { LensBlockDocument, LensDefinition, ThemesDocument, UiDocument } from "@code-lens/core";

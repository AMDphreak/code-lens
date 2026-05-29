import { useEffect, useRef } from "preact/hooks";
import type { AppearancePreference, LensBlockDocument, ThemesDocument, UiDocument } from "@code-lens/core";
import {
  attachCodeLens,
  detachCodeLens,
  syncCodeLensElement,
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

/** Official Preact component — wraps shared `<code-lens>` runtime. */
export function CodeLens(props: CodeLensProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const elRef = useRef<CodeLensElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    elRef.current = attachCodeLens(host, {
      document: props.document,
      themes: props.themes,
      ui: props.ui,
      themeId: props.themeId,
      appearance: props.appearance,
    });
    return () => {
      detachCodeLens(host);
      elRef.current = null;
    };
  }, []);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    el.configure({
      document: props.document,
      themes: props.themes,
      ui: props.ui,
      themeId: props.themeId,
      appearance: props.appearance,
    });
    syncCodeLensElement(el, props);
  }, [props.document, props.themes, props.ui, props.themeId, props.appearance]);

  return <div ref={hostRef} class={props.class ?? "code-lens-host"} />;
}

import { useEffect, useRef } from "react";
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
  className?: string;
};

/** Official React component — wraps shared `<code-lens>` runtime. Import `@code-lens/css` once in your app. */
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
      appearance: props.appearance ?? "auto",
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
      appearance: props.appearance ?? "auto",
    });
  }, [props.document, props.themes, props.ui]);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    patchCodeLensTheme(el, {
      themeId: props.themeId,
      appearance: props.appearance ?? "auto",
    });
  }, [props.themeId, props.appearance]);

  return <div ref={hostRef} className={props.className ?? "code-lens-host"} />;
}

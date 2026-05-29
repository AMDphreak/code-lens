import {
  defineComponent,
  h,
  onMounted,
  onUnmounted,
  ref,
  watch,
  type PropType,
} from "vue";
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

/** Official Vue 3 component — wraps shared `<code-lens>` runtime. */
export const CodeLens = defineComponent({
  name: "CodeLens",
  props: {
    document: { type: Object as PropType<LensBlockDocument>, required: true },
    themes: { type: Object as PropType<ThemesDocument>, required: true },
    ui: { type: Object as PropType<UiDocument>, required: true },
    themeId: { type: String, required: false },
    appearance: { type: String as PropType<AppearancePreference>, required: false },
    class: { type: String, required: false },
  },
  setup(props) {
    const host = ref<HTMLDivElement | null>(null);
    let el: CodeLensElement | undefined;

    onMounted(() => {
      if (!host.value) return;
      el = attachCodeLens(host.value, {
        document: props.document,
        themes: props.themes,
        ui: props.ui,
        themeId: props.themeId,
        appearance: props.appearance,
      });
    });

    onUnmounted(() => {
      if (host.value) detachCodeLens(host.value);
      el = undefined;
    });

    watch(
      () => [props.document, props.themes, props.ui, props.themeId, props.appearance] as const,
      () => {
        if (!el) return;
        el.configure({
          document: props.document,
          themes: props.themes,
          ui: props.ui,
          themeId: props.themeId,
          appearance: props.appearance,
        });
        syncCodeLensElement(el, props);
      },
    );

    return () => h("div", { ref: host, class: props.class ?? "code-lens-host" });
  },
});

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
  LensDefinition,
  ThemesDocument,
  UiDocument,
} from "@code-lens/core";

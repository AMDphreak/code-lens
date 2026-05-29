# @code-lens/react

**Placeholder adapter.** Do not port the state machine — embed `@code-lens/vanilla`:

```tsx
import { useEffect, useRef } from "react";
import { createCodeLens, registerCodeLens } from "@code-lens/vanilla";
import "@code-lens/css";

export function CodeLens(props: CodeLensProps) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    registerCodeLens();
    const el = createCodeLens({ ...props });
    host.current?.appendChild(el);
    return () => el.remove();
  }, [props]);
  return <div ref={host} />;
}
```

Copy the pattern from `@code-lens/solid`. See [docs/ecosystem.md](../../docs/ecosystem.md).

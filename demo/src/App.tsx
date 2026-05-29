import { For } from "solid-js";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { ColorSchemeToggle } from "~/components/ColorSchemeToggle";
import { DemoSection } from "~/components/DemoSection";
import { ImplementationsTable } from "~/components/ImplementationsTable";
import { LensComparisonTable } from "~/components/LensComparisonTable";
import { aiSpecPreview, NAV, SPEC_FILES, themes } from "~/data";

export default function App() {
  return (
    <div class="min-h-screen">
      <header class="border-b">
        <div class="container max-w-3xl space-y-4 py-10">
          <div class="flex items-start justify-between gap-4">
            <p class="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              code-lens
            </p>
            <ColorSchemeToggle />
          </div>
          <h1 class="font-heading text-4xl font-semibold tracking-tight md:text-5xl">code-lens</h1>
          <p class="max-w-2xl text-lg text-muted-foreground">
            The real lens for code examples — one snippet, multiple pedagogical naming conventions.
            Portable JSON5 spec; web, desktop, and mobile implementations.
          </p>
          <nav class="flex flex-wrap gap-2">
            <For each={NAV}>
              {(item) => (
                <Button
                  as="a"
                  href={item.href}
                  variant="outline"
                  size="sm"
                  class="font-mono text-[10px] uppercase tracking-widest"
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                >
                  {item.label}
                </Button>
              )}
            </For>
          </nav>
        </div>
      </header>

      <main class="container max-w-3xl space-y-12 py-10">
        <section class="space-y-3">
          <h2 class="font-heading text-2xl font-semibold tracking-tight">Where this idea comes from</h2>
          <p class="text-muted-foreground">
            Technical authors pick one naming convention per code example and hope you recognize the
            pattern. Readers routinely encounter four <em>referential strategies</em> — didactic,
            schematic, contextual, and role-labeled — without vocabulary to name them. A lens block
            keeps syntax fixed while identifiers, strings, and comments rotate to show each strategy.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="font-heading text-2xl font-semibold tracking-tight">The four lenses</h2>
          <LensComparisonTable />
        </section>

        <DemoSection themes={themes} />

        <section id="spec" class="scroll-mt-8 space-y-4">
          <h2 class="font-heading text-2xl font-semibold tracking-tight">Portable specification</h2>
          <p class="text-muted-foreground">
            Implementations load JSON5 files from <code class="font-mono text-sm">spec/</code>. This
            keeps UI behavior, themes, and example content independent of any framework.
          </p>
          <ul class="list-inside list-disc space-y-1 font-mono text-sm text-muted-foreground">
            <For each={SPEC_FILES}>{(file) => <li>{file}</li>}</For>
          </ul>
          <Button
            as="a"
            href="https://github.com/AMDphreak/code-lens/blob/main/docs/specification.md"
            variant="link"
            class="h-auto p-0 font-mono text-xs uppercase tracking-widest"
            target="_blank"
            rel="noopener noreferrer"
          >
            Full specification →
          </Button>
        </section>

        <section id="implementations" class="scroll-mt-8 space-y-4">
          <h2 class="font-heading text-2xl font-semibold tracking-tight">Implementations</h2>
          <p class="text-sm text-muted-foreground">
            Includes editor scaffolds:{" "}
            <a class="link-neutral" href="https://github.com/AMDphreak/code-lens/tree/main/extensions/vscode">
              VS Code
            </a>
            ,{" "}
            <a class="link-neutral" href="https://github.com/AMDphreak/code-lens/tree/main/extensions/zed">
              Zed
            </a>{" "}
            — see{" "}
            <a
              class="link-neutral"
              href="https://github.com/AMDphreak/code-lens/blob/main/docs/editor-integrations.md"
            >
              editor feasibility
            </a>
            .
          </p>
          <ImplementationsTable />
          <Button
            as="a"
            href="https://github.com/AMDphreak/code-lens/blob/main/implementations/REGISTRY.md"
            variant="link"
            class="h-auto p-0 font-mono text-xs uppercase tracking-widest"
            target="_blank"
            rel="noopener noreferrer"
          >
            Complete registry →
          </Button>
        </section>

        <section id="ai-spec" class="scroll-mt-8 space-y-4">
          <h2 class="font-heading text-2xl font-semibold tracking-tight">AI / LLM reproduction spec</h2>
          <p class="text-muted-foreground">
            Paste the linked document into an LLM to reproduce the component in another framework or
            toolkit. It encodes layout, motion, spec loading, and accessibility requirements.
          </p>
          <Button
            as="a"
            href="https://github.com/AMDphreak/code-lens/blob/main/docs/ai-reproduction-spec.md"
            variant="link"
            class="h-auto p-0 font-mono text-xs uppercase tracking-widest"
            target="_blank"
            rel="noopener noreferrer"
          >
            AI reproduction spec →
          </Button>
          <Card>
            <CardHeader class="pb-2">
              <CardTitle class="text-base">Preview (abbreviated)</CardTitle>
              <CardDescription>From docs/ai-reproduction-spec.md</CardDescription>
            </CardHeader>
            <CardContent>
              <pre class="max-h-80 overflow-auto whitespace-pre-wrap font-mono text-xs leading-relaxed text-muted-foreground">
                {aiSpecPreview}
              </pre>
            </CardContent>
          </Card>
        </section>
      </main>

      <Separator />

      <footer class="container max-w-3xl py-8 text-sm text-muted-foreground">
        <p>
          MIT · Built with SolidJS +{" "}
          <a class="link-neutral" href="https://www.solid-ui.com" target="_blank" rel="noopener noreferrer">
            solid-ui
          </a>{" "}
          ·{" "}
          <a class="link-neutral" href="https://github.com/AMDphreak" target="_blank" rel="noopener noreferrer">
            AMDphreak
          </a>
        </p>
      </footer>
    </div>
  );
}

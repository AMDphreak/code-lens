import { listThemeIds, parseLensBlock, parseThemes, parseUi } from "@code-lens/core";
import { createCodeLens, registerCodeLens } from "@code-lens/vanilla";
import blockSource from "../../spec/examples/zig-namespace.json5?raw";
import themesSource from "../../spec/themes.json5?raw";
import uiSource from "../../spec/ui.json5?raw";
import aiPreview from "../../docs/ai-reproduction-spec.md?raw";

import "../../packages/vanilla/src/code-lens.css";

registerCodeLens();

const themes = parseThemes(themesSource);
const ui = parseUi(uiSource);
const document_ = parseLensBlock(blockSource);

const host = document.getElementById("demo-host")!;
const themeSelect = document.getElementById("theme-select") as HTMLSelectElement;

const block = createCodeLens(
  { document: document_, themes, ui, themeId: themes.defaultTheme },
  themes.defaultTheme,
);
host.appendChild(block);

for (const id of listThemeIds(themes)) {
  const opt = document.createElement("option");
  opt.value = id;
  opt.textContent = themes.themes[id].label;
  if (id === themes.defaultTheme) opt.selected = true;
  themeSelect.appendChild(opt);
}

themeSelect.addEventListener("change", () => {
  block.setAttribute("theme", themeSelect.value);
});

const implementations = [
  { platform: "Web", name: "Vanilla JS (<code-lens>)", pkg: "@code-lens/vanilla", status: "shipped" },
  { platform: "Web", name: "SolidJS", pkg: "@code-lens/solid", status: "wip" },
  { platform: "Web", name: "React", pkg: "@code-lens/react", status: "planned" },
  { platform: "Web", name: "Vue", pkg: "@code-lens/vue", status: "planned" },
  { platform: "Web", name: "Svelte", pkg: "@code-lens/svelte", status: "planned" },
  { platform: "Web", name: "Angular", pkg: "@code-lens/angular", status: "planned" },
  { platform: "Web", name: "Preact", pkg: "@code-lens/preact", status: "planned" },
  { platform: "Web", name: "Lit", pkg: "@code-lens/lit", status: "planned" },
  { platform: "Desktop", name: "Tauri + webview", pkg: "examples/tauri", status: "planned" },
  { platform: "Desktop", name: "Electron", pkg: "examples/electron", status: "planned" },
  { platform: "Desktop", name: "Qt (QML)", pkg: "implementations/qt", status: "planned" },
  { platform: "Desktop", name: "GTK 4", pkg: "implementations/gtk", status: "planned" },
  { platform: "Mobile", name: "React Native", pkg: "@code-lens/react-native", status: "planned" },
  { platform: "Mobile", name: "SwiftUI", pkg: "implementations/swiftui", status: "planned" },
  { platform: "Mobile", name: "Jetpack Compose", pkg: "implementations/compose", status: "planned" },
  { platform: "Mobile", name: "Flutter", pkg: "@code-lens/flutter", status: "planned" },
];

const implHost = document.getElementById("impl-table")!;
const table = document.createElement("table");
table.className = "impl-table";
table.innerHTML = `<thead><tr><th>Platform</th><th>Implementation</th><th>Package</th><th>Status</th></tr></thead>`;
const tbody = document.createElement("tbody");
for (const row of implementations) {
  const tr = document.createElement("tr");
  tr.innerHTML = `<td>${row.platform}</td><td>${row.name}</td><td><code>${row.pkg}</code></td><td class="status-${row.status}">${row.status}</td>`;
  tbody.appendChild(tr);
}
table.appendChild(tbody);
implHost.appendChild(table);

const preview = document.getElementById("ai-preview");
if (preview) preview.textContent = aiPreview.slice(0, 1200) + "\n\n…";

import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const out = join(dir, "../dist");
mkdirSync(out, { recursive: true });
copyFileSync(join(dir, "../src/lens-code-block.css"), join(out, "lens-code-block.css"));

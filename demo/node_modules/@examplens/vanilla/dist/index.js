import { registerLensCodeBlock } from "./lens-code-block.js";
export { createLensCodeBlock, LensCodeBlockElement, mountFromSpec, registerLensCodeBlock, } from "./lens-code-block.js";
export function injectLensCodeBlockStyles(doc = document) {
    if (doc.getElementById("examplens-styles"))
        return;
    const link = doc.createElement("link");
    link.id = "examplens-styles";
    link.rel = "stylesheet";
    link.href = new URL("./lens-code-block.css", import.meta.url).href;
    doc.head.appendChild(link);
}
export default registerLensCodeBlock;

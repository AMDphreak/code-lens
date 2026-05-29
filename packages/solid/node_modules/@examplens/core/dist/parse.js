import JSON5 from "json5";
export function parseLensBlock(source) {
    const doc = JSON5.parse(source);
    validateLensBlock(doc);
    return doc;
}
export function parseThemes(source) {
    return JSON5.parse(source);
}
export function parseUi(source) {
    return JSON5.parse(source);
}
function validateLensBlock(doc) {
    if (doc.version !== 1)
        throw new Error(`Unsupported lens block version: ${doc.version}`);
    if (!doc.lenses?.length || doc.lenses.length < 2) {
        throw new Error("Lens block requires at least two lenses");
    }
    const lineCounts = doc.lenses.map((l) => l.lines.length);
    if (!lineCounts.every((n) => n === lineCounts[0])) {
        throw new Error("All lenses must have the same number of lines");
    }
    for (let li = 0; li < doc.lenses[0].lines.length; li++) {
        const tokenCounts = doc.lenses.map((l) => l.lines[li].length);
        if (!tokenCounts.every((n) => n === tokenCounts[0])) {
            throw new Error(`Line ${li}: token count mismatch across lenses`);
        }
    }
}
export function collectVariableSlots(lenses) {
    const slotValues = new Map();
    for (const lens of lenses) {
        for (const line of lens.lines) {
            for (const token of line) {
                if (!token.slot)
                    continue;
                const values = slotValues.get(token.slot) ?? new Set();
                values.add(token.text);
                slotValues.set(token.slot, values);
            }
        }
    }
    const variable = new Set();
    for (const [slot, values] of slotValues) {
        if (values.size > 1)
            variable.add(slot);
    }
    return variable;
}
export function resolveToken(lenses, lensIndex, lineIndex, tokenIndex) {
    return lenses[lensIndex].lines[lineIndex][tokenIndex];
}
export function lensIndexById(lenses, id) {
    const i = lenses.findIndex((l) => l.id === id);
    if (i < 0)
        throw new Error(`Unknown lens id: ${id}`);
    return i;
}

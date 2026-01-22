const fs = require('fs');
const path = require('path');

const TOKENS_PATH = path.join(__dirname, '../src/tokens/figma-tokens.json');
const OUTPUT_PATH = path.join(__dirname, '../src/styles/tokens.css');

// Ensure styles directory exists
if (!fs.existsSync(path.dirname(OUTPUT_PATH))) {
    fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
}

const tokens = require(TOKENS_PATH);

// Helper to resolve a value from the context
function resolveValue(value, context) {
    if (typeof value !== 'string') return value;

    // Check for {Reference} pattern
    const match = value.match(/^\{(.+)\}$/);
    if (!match) return value;

    const pathParts = match[1].split('.');
    let current = context;

    for (const part of pathParts) {
        if (current && current[part]) {
            current = current[part];
        } else {
            console.warn(`Could not resolve path: ${match[1]}`);
            console.warn(`Failed at part: ${part}`);
            console.warn(`Available keys: ${current ? Object.keys(current) : 'null'}`);
            return value; // Return original if not found
        }
    }

    // If the resolved item has a 'value' property (it's a token node), use that
    // Otherwise it might be the value itself (if the context was already flattened or simple)
    let resolved = current;
    if (current && typeof current === 'object' && 'value' in current) {
        resolved = current.value;
    }

    // Recurse in case the resolved value is also a reference
    return resolveValue(resolved, context);
}

// Helper to flatten object to CSS variables
function flattenTokens(obj, prefix = '', context, result = {}) {
    for (const key in obj) {
        if (key === 'value' || key === 'type') continue;

        const item = obj[key];
        const newPrefix = prefix ? `${prefix}-${key}` : key;

        if (typeof item === 'object' && item !== null) {
            // If it's a leaf node (has 'value'), process it
            if ('value' in item) {
                let resolvedValue = resolveValue(item.value, context);

                // Add px to numbers if appropriate
                if (item.type === 'number' && resolvedValue !== 0 && resolvedValue !== '0') {
                    resolvedValue = `${resolvedValue}px`;
                }

                // Convert camelCase or spaces to kebab-case
                const varName = '--' + newPrefix
                    .replace(/\s+/g, '-')
                    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
                    .toLowerCase();

                result[varName] = resolvedValue;
            } else {
                // Recurse
                flattenTokens(item, newPrefix, context, result);
            }
        }
    }
    return result;
}

// Helper to deep merge objects
function deepMerge(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                deepMerge(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return deepMerge(target, ...sources);
}

function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

function generateCSS() {
    console.log('Generating tokens...');

    // 1. Build Contexts
    // Primitives/Default contains 'Colour', 'Font', etc.
    const primitives = tokens['Primitives/Default'] || {};

    // Alias colours/BrandA contains 'Primary', 'Tertiary', etc.
    const aliasesA = tokens['Alias colours/BrandA'] || {};
    const aliasesB = tokens['Alias colours/BrandB'] || {};

    // Mapped/BrandA contains 'Surface', 'Text', etc.
    const mappedA = tokens['Mapped/BrandA'] || {};
    const mappedB = tokens['Mapped/BrandB'] || {};

    // Responsive tokens
    const responsiveDesktop = tokens['Responsive/Desktop'] || {};
    const responsiveMobile = tokens['Responsive/Mobile'] || {};

    // Context for Brand A includes Primitives and Aliases for Brand A
    // We use deep merge to preserve keys from both (e.g. Font from Primitives AND Font from Aliases)
    const contextA = deepMerge({}, primitives, aliasesA, mappedA);
    const contextB = deepMerge({}, primitives, aliasesB, mappedB);

    // Context for shared/responsive tokens (needs Primitives for Scale references)
    const contextShared = deepMerge({}, primitives);

    // 2. Resolve & Flatten Mapped Tokens
    // We only generate CSS variables for the Mapped tokens as those are the usage layer
    const varsA = flattenTokens(mappedA, '', contextA);
    const varsB = flattenTokens(mappedB, '', contextB);

    // Resolve Responsive tokens
    const varsDesktop = flattenTokens(responsiveDesktop, 'responsive-desktop', contextShared);
    const varsMobile = flattenTokens(responsiveMobile, 'responsive-mobile', contextShared);

    // 3. Generate CSS Content
    let cssContent = '/* Auto-generated tokens file. Do not edit manually. */\n\n';

    // Global/Responsive Tokens
    cssContent += ':root {\n';
    for (const [key, value] of Object.entries(varsDesktop)) {
        cssContent += `  ${key}: ${value};\n`;
    }
    for (const [key, value] of Object.entries(varsMobile)) {
        cssContent += `  ${key}: ${value};\n`;
    }
    cssContent += '}\n\n';

    // Brand A Class
    cssContent += '.theme-brand-a {\n';
    for (const [key, value] of Object.entries(varsA)) {
        cssContent += `  ${key}: ${value};\n`;
    }
    cssContent += '}\n\n';

    // Brand B Class
    cssContent += '.theme-brand-b {\n';
    for (const [key, value] of Object.entries(varsB)) {
        cssContent += `  ${key}: ${value};\n`;
    }
    cssContent += '}\n';

    fs.writeFileSync(OUTPUT_PATH, cssContent);
    console.log(`Tokens generated at ${OUTPUT_PATH}`);
}

generateCSS();

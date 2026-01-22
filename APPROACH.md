# Technical Approach

This document outlines the architectural decisions, workflows and limitations of the current implementation.

## 1. Design-to-Code Workflow

The workflow transforms raw design data into usable UI components through a semi-automated pipeline:

1.  The `src/tokens/figma-tokens.json` file serves as the single source of truth, intended to be a direct export from Figma.
2.  A custom Node.js script (`scripts/generate-tokens.cjs`) processes this JSON. It:
    - Resolves nested references.
    - Flattens the structure.
    - Generates standard CSS Custom Properties (CSS Variables).
3.  The output is written to `src/styles/tokens.css`, which is imported globally.
4.  Tailwind CSS is configured (`tailwind.config.js`) to map semantic utility classes to these generated CSS variables.
5.  Preact components are built using these Tailwind classes, ensuring they never use hardcoded values.

## 2. Token Management

The tokens follow a 3 layers hierarchy to separate raw values from semantic intent:

- The raw palette (Hex codes, font stacks).
  - _Usage_: Internal references only.
- Brand-specific mappings.
- The semantic usage layer.
  - _Usage_: This is the layer consumed by the application.

Tokens are consumed exclusively through Tailwind Utility Classes.

- `className="bg-primary"` (Maps to `var(--surface-colour-action-primary)`)

## 3. Theme Switching

Multi-brand support is handled via CSS Scoping and Preact Context.

- The token generator creates scoped blocks in `tokens.css`:
  ```css
  :root {
    /* Shared tokens between the two themes (spacing, padding, typography) */
  }
  .theme-brand-a {
    --surface-colour-action-primary: #1fceb5;
  }
  .theme-brand-b {
    --surface-colour-action-primary: #901438;
  }
  ```
- **Runtime Switching**:
  - `ThemeContext.tsx` provides a `useTheme()` hook.
  - When the theme changes, it updates the class on the `document.documentElement` (HTML tag).
  - This triggers an immediate cascade update of all CSS variables within the browser.

## 4. Handling Token Updates

When a designer updates a value in figma:

1.  The new JSON is pasted into `src/tokens/figma-tokens.json`.
2.  The developer runs the generation script:
    ```bash
    node scripts/generate-tokens.cjs
    ```
3.  The `src/styles/tokens.css` file updates. If the dev server is running, the changes are Hot Module Reloaded instantly.

## 5. Future Improvements (Production Readiness)

With more time or in a large-scale production environment, I would implement:

- Replace the custom `generate-tokens.cjs` script with [Style Dictionary](https://amzn.github.io/style-dictionary/). It is the industry standard for robust, multi-platform token transformation.
- Currently, `tailwind.config.js` is manually mapped. I would write a script to auto-generate a Tailwind preset from the tokens, ensuring 100% synchronization.
- Automate the fetch-and-build process via GitHub Actions. A bot could open a PR whenever Figma tokens change.
- Integrate Chromatic or Percy to automatically detect if a token change breaks the UI layout unexpectedly.

## 6. Trade-offs and Limitations

- The link between CSS variables and Tailwind config is manual. If a new token is added to JSON but not to Tailwind config, it won't be usable as a utility class.
- The custom generation script assumes a specific JSON structure. If the Figma plugin changes its export format, the script will break.
- Relying heavily on CSS variables is generally performant, but extremely complex pages with thousands of variable re-calculations during theme switches can cause minor layout thrashing on lowerend devices.

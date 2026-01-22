# Component Library & Design Token Pipeline

This challenge reflects the core work you would be doing at Biglight: building and
maintaining a multi-brand UI component library using Preact, TailwindCSS and
Storybook, with a focus on design-to-code workflows, automation and
maintainability.

## Setup and Installation

1.  Clone the repository:

    ```bash
    git clone <repository-url>
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

## Running Storybook

Storybook to develop and document our UI components in isolation.

To start Storybook:

```bash
npm run storybook
```

This will open the Storybook interface at `http://localhost:6006`.

## Theme System

The project supports multiple themes (Brand A and Brand B) using a token-based architecture.

### How it works

1.  **Design Tokens**: Defined in `src/tokens/figma-tokens.json` (exported from Figma & provided).
2.  **Generation**: A build script transforms these JSON tokens into CSS variables in `src/styles/tokens.css`.
3.  **Consumption**: Components use Tailwind utility classes which map to these CSS variables.

### Switching Themes

- **From Storybook**: You can switch themes using the toolbar controls.

### Updating Tokens

If the design tokens in the JSON file are updated, you must regenerate the CSS variables:

```bash
# Run the generation script
node scripts/generate-tokens.cjs
```

## Approximate Time Spent

**Total Time: 9 hours**

- **Architecture & Token Pipeline**: 1.5 hours
  - Setting up the `generate-tokens.cjs` script.
  - Mapping Tailwind config to CSS variables.
- **Component Implementation**: 6 hours
  - Building core components (Button, Input, Dropdown, Cards).
  - Ensuring accessibility (ARIA roles, keyboard navigation).
- **Documentation**: 1.5 hours
  - Writing stories.
  - Refining README and cleanup.

## AI usage note

- **ChatGPT**:
  - Used to verify the `generate-tokens.cjs` file and resolve issues related to nested and mapped values.
  - Used to review some components to ensure code stability and to prevent potential crashes.
  - Verified accessibility attributes to ensure compliance and confirm that no required attributes were missing.

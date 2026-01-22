import type { Preview } from "@storybook/preact";
import { ThemeProvider } from "../src/context/ThemeContext";
import "../src/styles/tokens.css";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo"
    }
  },
  globalTypes: {
    theme: {
      description: "Global theme for components",
      defaultValue: "brandA",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: ["brandA", "brandB"],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || "brandA";
      return (
        <ThemeProvider initialTheme={theme}>
          {Story()}
        </ThemeProvider>
      );
    },
  ],
};

export default preview;

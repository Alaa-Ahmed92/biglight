import { createContext } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import type { ComponentChildren } from 'preact';

type Theme = 'brandA' | 'brandB';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'brandA',
  setTheme: () => { },
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children, initialTheme = 'brandA' }: { children: ComponentChildren, initialTheme?: Theme }) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    setTheme(initialTheme);
  }, [initialTheme]);

  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove('theme-brand-a', 'theme-brand-b');

    const themeClass = `theme-${theme.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    root.classList.add(themeClass);

  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

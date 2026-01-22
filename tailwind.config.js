/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--surface-colour-action-primary)',
        'primary-hover': 'var(--surface-colour-action-hover-primary)',
        'primary-text': 'var(--text-colour-action-on-primary)',
        'primary-text-hover': 'var(--surface-colour-action-inverse)',

        secondary: 'var(--surface-colour-action-secondary)',
        'secondary-hover': 'var(--surface-colour-action-hover-secondary)',
        'secondary-text': 'var(--text-colour-action-on-secondary)',

        tertiary: 'var(--surface-colour-action-inverse)',
        'tertiary-hover': 'var(--surface-colour-action-inverse-darker)',
        'tertiary-text': 'var(--text-colour-action-on-tertiary)',

        background: 'var(--surface-colour-page)',
        'brand-primary': 'var(--surface-colour-brand-primary)',

        surface: 'var(--surface-colour-secondary)',
        'button-disabled-surface': 'var(--surface-colour-disabled-dark)',
        'warning-surface': 'var(--surface-colour-warning)',

        passive: 'var(--text-colour-passive)',

        text: 'var(--text-colour-body)',
        white: 'var(--surface-colour-action-inverse)',

        border: 'var(--border-colour-passive)',

        error: 'var(--surface-colour-error)',
        success: 'var(--surface-colour-positive)',
        'dark-error': 'var(--text-colour-error)',

        disabled: 'var(--text-colour-disabled)',
        'disabled-background': 'var(--surface-colour-disabled-light)',
      },
      borderWidth: {
        DEFAULT: '1px',
        none: 'var(--border-width-none)',
        xs: 'var(--border-width-xs)',
        sm: 'var(--border-width-sm)',
        md: 'var(--border-width-md)',
        lg: 'var(--border-width-lg)',
        xl: 'var(--border-width-xl)',
      },
      borderRadius: {
        DEFAULT: 'var(--border-radius-sm)',
        none: 'var(--border-radius-none)',
        xs: 'var(--border-radius-xs)',
        sm: 'var(--border-radius-sm)',
        md: 'var(--border-radius-md)',
        lg: 'var(--border-radius-lg)',
        xl: 'var(--border-radius-xl)',
        xxl: 'var(--border-radius-xxl)',
        round: 'var(--border-radius-round)',
      },
      boxShadow: {
        'dropdown': '-1px -1px 4px 4px rgba(0, 0, 0, 0.02), 6px 10px 24px rgba(0, 0, 0, 0.3)',
      },
      fontSize: {
        'body-xs': 'var(--responsive-desktop-font-size-body-xs)',
        'body-sm': 'var(--responsive-desktop-font-size-body-sm)',
        'body-md': 'var(--responsive-desktop-font-size-body-md)',
        'body-lg': 'var(--responsive-desktop-font-size-body-lg)',
        'heading-h1': 'var(--responsive-desktop-font-size-heading-h1)',
        'heading-h2': 'var(--responsive-desktop-font-size-heading-h2)',
        'heading-h3': 'var(--responsive-desktop-font-size-heading-h3)',
        'heading-h4': 'var(--responsive-desktop-font-size-heading-h4)',
        'heading-h5': 'var(--responsive-desktop-font-size-heading-h5)',
        'heading-h6': 'var(--responsive-desktop-font-size-heading-h6)',
        'action-sm': 'var(--responsive-desktop-font-size-action-sm)',
        'action-md': 'var(--responsive-desktop-font-size-action-md)',
        'mobile-heading-h5': 'var(--responsive-mobile-font-size-heading-h5)',
      },
      lineHeight: {
        'heading-h5': '120%',
      },
      spacing: {
        '3xs': 'var(--responsive-desktop-spacing-3xs)',
        '2xs': 'var(--responsive-desktop-spacing-2xs)',
        'xs': 'var(--responsive-desktop-spacing-xs)',
        'sm': 'var(--responsive-desktop-spacing-sm)',
        'md': 'var(--responsive-desktop-spacing-md)',
        'lg': 'var(--responsive-desktop-spacing-lg)',
        'xl': 'var(--responsive-desktop-spacing-xl)',
        '2xl': 'var(--responsive-desktop-spacing-2xl)',
        '3xl': 'var(--responsive-desktop-spacing-3xl)',
        '4xl': 'var(--responsive-desktop-spacing-4xl)',
      },
      padding: {
        '3xs': 'var(--responsive-desktop-spacing-3xs)',
        '2xs': 'var(--responsive-desktop-spacing-2xs)',
        'xs': 'var(--responsive-desktop-spacing-xs)',
        'sm': 'var(--responsive-desktop-spacing-sm)',
        'md': 'var(--responsive-desktop-spacing-md)',
        'lg': 'var(--responsive-desktop-spacing-lg)',
        'xl': 'var(--responsive-desktop-spacing-xl)',
        '2xl': 'var(--responsive-desktop-spacing-2xl)',
        '3xl': 'var(--responsive-desktop-spacing-3xl)',
        '4xl': 'var(--responsive-desktop-spacing-4xl)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Dark theme (Catppuccin Mocha)
        dark: {
          bg: '#11111b',
          surface: '#1e1e2e',
          overlay: '#252536',
          border: '#313244',
          hover: '#45475a',
          text: '#cdd6f4',
          subtext: '#a6adc8',
          muted: '#6c7086',
        },
        // Light theme (Catppuccin Latte)
        light: {
          bg: '#eff1f5',
          surface: '#ffffff',
          overlay: '#e6e9ef',
          border: '#ccd0da',
          hover: '#dce0e8',
          text: '#4c4f69',
          subtext: '#5c5f77',
          muted: '#7c7f93',
        },
        // Accent colors
        accent: {
          blue: '#89b4fa',
          green: '#a6e3a1',
          purple: '#cba6f7',
          yellow: '#f9e2af',
          orange: '#fab387',
          red: '#f38ba8',
          pink: '#f5c2e7',
        },
        // Light accent colors
        'accent-light': {
          blue: '#1e66f5',
          green: '#40a02b',
          purple: '#8839ef',
          yellow: '#df8e1d',
          orange: '#fe640b',
          red: '#d20f39',
          pink: '#ea76cb',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'node': '0 4px 12px rgba(0, 0, 0, 0.3)',
        'node-hover': '0 6px 20px rgba(0, 0, 0, 0.4)',
      }
    },
  },
  plugins: [],
}

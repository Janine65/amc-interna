/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,scss}"],
  // Preflight (CSS reset) deaktivieren, damit PrimeNG-Styles nicht überschrieben werden
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      // PrimeNG CSS-Variablen als Tailwind-Farben einbinden
      colors: {
        "surface-overlay": "var(--surface-overlay)",
        "surface-card": "var(--surface-card)",
        "surface-border": "var(--surface-border)",
      },
      textColor: {
        color: "var(--text-color)",
        900: "var(--surface-900)",
      },
      borderColor: {
        primary: "var(--primary-color)",
      },
    },
  },
  plugins: [],
};

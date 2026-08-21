/** @type {import('tailwindcss').Config} */
export default {
  // Tailwind só analisa estes ficheiros — CSS final fica pequeno (tree-shaking)
  content: ["./index.html", "./app.html", "./src/**/*.{js,jsx,html}"],
  theme: {
    extend: {
      // Paleta personalizada do ginásio FitPulse
      colors: {
        brand: {
          50: "#f0fdf4",
          100: "#dcfce7",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          900: "#14532d",
        },
      },
      // Fonte do sistema = zero pedidos extra à rede
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

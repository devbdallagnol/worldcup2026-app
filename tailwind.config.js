/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores personalizadas do tema da Copa
        pitch: {
          DEFAULT: '#030705',      // Verde ultra escuro/quase preto para o body
          light: '#060e0b',        // Tom ligeiramente mais claro para cards de vidro
          lighter: '#0e1a15',      // Usado em skeletons/hovers
        },
        bone: {
          DEFAULT: '#f5f5f7',      // Branco fosco elegante para textos principais
          dark: '#a1a1aa',
        },
        line: 'rgba(255, 255, 255, 0.05)', // Bordas translúcidas de vidro
        gold: {
          DEFAULT: '#fbbf24',      // Destaques em âmbar/ouro
          light: '#fde047',
        },
        turf: {
          DEFAULT: '#10b981',      // Verde campo para destaques secundários
        }
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'], // Ou qualquer outra fonte display importada
      },
      tracking: {
        widest2: '0.2em',
      }
    },
  },
  plugins: [],
}
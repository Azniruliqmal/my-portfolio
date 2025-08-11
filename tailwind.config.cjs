/**** Tailwind Config ****/ 
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Poppins', 'ui-sans-serif', 'system-ui'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a'
        }
      },
      backgroundImage: {
        'grid-light': 'linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)',
        'grid-dark': 'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
        'hero-gradient': 'radial-gradient(circle at 20% 20%, rgba(56,189,248,0.25), transparent 40%), radial-gradient(circle at 80% 30%, rgba(167,139,250,0.25), transparent 45%), radial-gradient(circle at 50% 80%, rgba(34,197,94,0.25), transparent 50%)'
      },
      boxShadow: {
        'glass': '0 4px 30px rgba(0,0,0,0.1)',
        'glow': '0 0 20px -5px rgba(59,130,246,0.6)'
      },
      backdropBlur: {
        xs: '2px'
      },
      animation: {
        'slow-spin': 'spin 10s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' }
        },
        gradient: {
          '0%, 100%': { 'background-position': '0% 50%' },
            '50%': { 'background-position': '100% 50%' }
        }
      }
    }
  },
  plugins: [
    function({ addUtilities }) {
      const utilities = {
        '.glass-panel': {
          'background': 'rgba(255,255,255,0.08)',
          'box-shadow': '0 4px 30px rgba(0,0,0,0.1)',
          'backdrop-filter': 'blur(12px) saturate(180%)',
          '-webkit-backdrop-filter': 'blur(12px) saturate(180%)',
          'border': '1px solid rgba(255,255,255,0.2)'
        },
        '.glass-dark': {
          'background': 'rgba(17,25,40,0.55)',
          'border': '1px solid rgba(255,255,255,0.1)'
        }
      };
      addUtilities(utilities);
    }
  ],
};

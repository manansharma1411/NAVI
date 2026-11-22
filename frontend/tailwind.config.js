/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#090D16', // Deep slate-obsidian canvas
        surface: {
          50: '#1A2338',        // Elevated interactive / hover
          100: '#141C2E',       // Dropdowns, modals, elevated cards
          200: '#0F1626',       // Panels, cards, sidebars
          300: '#0C111E',       // Secondary background
          DEFAULT: '#0F1626',
          border: '#1E293B',    // Subtle line divider
          'border-subtle': 'rgba(255, 255, 255, 0.06)',
          'border-strong': '#334155',
        },
        brand: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1', // Primary Electric Indigo
          600: '#4F46E5', // Primary brand action
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
          accent: '#3B82F6', // Neon Cobalt Blue
          violet: '#8B5CF6', // Sparingly used violet accent
        },
        status: {
          success: '#10B981',
          'success-bg': 'rgba(16, 185, 129, 0.1)',
          warning: '#F59E0B',
          'warning-bg': 'rgba(245, 158, 11, 0.1)',
          error: '#EF4444',
          'error-bg': 'rgba(239, 68, 68, 0.1)',
          info: '#3B82F6',
          'info-bg': 'rgba(59, 130, 246, 0.1)',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', 'monospace']
      },
      boxShadow: {
        'subtle-border': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
        'elevated': '0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
        'modal': '0 20px 50px -12px rgba(0, 0, 0, 0.7), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)',
        'glow-brand': '0 0 20px -3px rgba(99, 102, 241, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 180ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 180ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-down': 'slideDown 200ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shimmer': 'shimmer 2s infinite linear',
        'pulse-subtle': 'pulseSubtle 2.5s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.97)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        }
      }
    },
  },
  plugins: [],
}

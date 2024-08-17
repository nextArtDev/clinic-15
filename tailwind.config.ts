import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      backgroundImage: {
        'red-gradient':
          'linear-gradient(135deg,hsl(14deg 84% 40%) 0%,hsl(18deg 76% 43%) 9%,hsl(21deg 69% 47%) 20%,hsl(23deg 64% 51%) 34%,hsl(25deg 67% 55%) 60%,hsl(27deg 70% 59%) 72%,hsl(29deg 74% 63%) 80%,hsl(31deg 79% 68%) 87%,hsl(32deg 85% 73%) 94%,hsl(34deg 95% 77%) 100%)',
        'blue-gradient':
          'linear-gradient(285deg,hsl(222deg 21% 46%) 0%,hsl(222deg 25% 45%) 5%,hsl(222deg 30% 44%) 13%,hsl(222deg 34% 43%) 22%,hsl(222deg 40% 42%) 33%,hsl(222deg 45% 40%) 47%,hsl(222deg 51% 39%) 62%,hsl(222deg 58% 37%) 79%,hsl(222deg 66% 36%) 93%,hsl(221deg 77% 34%) 100%)',
        'gray-gradient':
          'linear-gradient(285deg,hsl(109deg 10% 77%) 0%,hsl(138deg 13% 77%) 3%,hsl(156deg 17% 77%) 12%,hsl(169deg 21% 76%) 30%,hsl(179deg 23% 76%) 52%,hsl(188deg 30% 76%) 70%,hsl(195deg 36% 77%) 82%,hsl(202deg 41% 79%) 90%,hsl(209deg 45% 80%) 96%,hsl(218deg 45% 82%) 100%)',
        'hero-gradient':
          // 'linear-gradient(180deg, rgba(255,228,127,1) 0%, rgba(202,79,1,1) 50%, rgba(0,0,0,1) 100%)',
          'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(247,247,247,1) 50%, rgba(51,51,51,1) 75%)',
        'tabs-gradient':
          'linear-gradient(0deg, hsla(0, 0%, 97%, 1) 0%, hsla(0, 0%, 97%, 1) 50%, hsla(0, 0%, 100%, 1) 100%)',
        'hero-gradient-reverse':
          'linear-gradient(0deg, rgba(255,228,127,1) 0%, rgba(202,79,1,1) 50%, rgba(0,0,0,1) 100%)',
        'hero-parts-gradient':
          'linear-gradient(180deg, rgba(255,228,127,0.4) 0%, rgba(202,79,1,0.4) 50%, rgba(0,0,0,1) 100%)',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap)))' },
        },
        'marquee-vertical': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-100% - var(--gap)))' },
        },
        'skew-scroll': {
          '0%': {
            transform:
              'rotatex(20deg) rotateZ(-20deg) skewX(20deg) translateZ(0) translateY(0)',
          },
          '100%': {
            transform:
              'rotatex(20deg) rotateZ(-20deg) skewX(20deg) translateZ(0) translateY(-100%)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        marquee: 'marquee var(--duration) linear infinite',
        'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
        'skew-scroll': 'skew-scroll 10s linear infinite',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('autoprefixer'),
  ],
} satisfies Config

export default config

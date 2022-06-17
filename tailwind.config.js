module.exports = {
  content: ['./src/**/*.{ts,tsx,css,scss}', './index.html'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: '#fff',
        black: '#000',
        green: {
          pale: 'hsl(172, 43%, 76%)',
        },
        violet: {
          DEFAULT: 'hsl(259, 99%, 60%)',
        },
        gray: {
          DEFAULT: 'hsl(0, 0%, 25%)',
          light: 'hsl(240, 1%, 60%)',
          pale: 'hsl(228, 33%, 97%)',
        },
      },
      grayscale: {
        50: '50%',
        80: '80%',
        90: '90%',
        95: '95%',
      },
      keyframes: {
        expire: {
          '0%': { width: '100%' },
          '100%': { width: '0%' },
        },
      },
      animation: {
        'spin-fast': 'spin 0.5s linear infinite',
        expire: 'expire linear',
      },
      maxWidth: {
        screen: '100vw',
      },
      maxHeight: {
        md: '480px',
      },
      screens: {
        '2xl': { max: '1535px' },
        xl: { max: '1279px' },
        lg: { max: '1023px' },
        md: { max: '480px' },
        xs: { max: '320px' },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};

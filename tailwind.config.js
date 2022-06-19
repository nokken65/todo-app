module.exports = {
  content: ['./src/**/*.{ts,tsx,css,scss}', './index.html'],
  theme: {
    extend: {
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
        '6xl': { max: '1920px' },
        '5xl': { max: '1600px' },
        '4xl': { max: '1366px' },
        '3xl': { max: '1280px' },
        '2xl': { max: '1024px' },
        xl: { max: '768px' },
        lg: { max: '640px' },
        md: { max: '480px' },
        xs: { max: '320px' },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};

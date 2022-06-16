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
      animation: {
        'spin-fast': 'spin 0.5s linear infinite',
      },
      maxWidth: {
        screen: '100vw',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};

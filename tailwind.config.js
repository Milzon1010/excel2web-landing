/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: { colors: { brand: {50:'#eef9ff',100:'#d8f0ff',500:'#00B2FF',600:'#0093D1',700:'#0676A6'} } } },
  plugins: []
};

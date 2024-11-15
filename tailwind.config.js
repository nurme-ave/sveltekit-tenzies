import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      }
    }
  },

  plugins: [typography]
};

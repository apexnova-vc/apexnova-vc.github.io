/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}", // Adjust this glob pattern to match your project file structure
    // "./path/to/other/directories/if/any/**/*.html", // Include any other directories where you use Tailwind classes
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

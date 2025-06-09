/** @type {import('tailwindcss').Config} */


export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#17181D",   // Dark Grayish Black (Main Background)
        secondary: "#292C35", // Muted Charcoal Gray (Secondary Background)
        accent: "skyblue",    // Warm Orange (Highlight, Buttons)
        // accent: "#8AC5CD",    // Warm Orange (Highlight, Buttons)
        // accent: "#F09145",    // Warm Orange (Highlight, Buttons)
        light: "#FCD9B8",     // Soft Peach (Text Highlights, Backgrounds)
      },
      dropShadow: {
        customShadow: "inset 5px - 5px_5px_#101215, inset_- 5px_5px_5px #424655"
    }
  },
},
plugins: [],
};

// /** @type {import('tailwindcss').Config} */

// export default {
//   darkMode: "class", // Enables class-based dark mode switching
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       colors: {
//         primary: "var(--color-primary)",
//         secondary: "var(--color-secondary)",
//         accent: "var(--color-accent)",
//         light: "var(--color-light)",
//       },
//       dropShadow: {
//         customShadow: "inset 5px -5px 5px var(--shadow-dark), inset -5px 5px 5px var(--shadow-light)",
//       },
//     },
//   },
//   plugins: [],
// };

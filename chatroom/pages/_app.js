import { createGlobalStyle, ThemeProvider, keyframes } from "styled-components";

const theme = {
  mediaQueries: {
    mobileS: "(max-width: 320px)",
    mobileM: "(max-width: 375px)",
    mobileL: "(max-width: 425px)",
    tabletS: "(max-width: 525px)",
    tabletM: "(max-width: 625px)",
    tabletL: "(max-width: 768px)",
    laptop: "(max-width: 1024px)",
    laptopL: "(max-width: 1440px)",
    desktop: "(max-width: 2560px)",
  },
  colors: {
    blue50: "#e8f1fb",
    blue100: "#d1e3f6",
    blue200: "#a4c7ed",
    blue300: "#76abe5",
    blue400: "#498fdc",
    blue500: "#1b73d3",
    blue600: "#165ca9",
    blue700: "#10457f",
    blue800: "#0b2e54",
    blue900: "#05172a",

    gold50: "#fef7eb",
    gold100: "#fdefd7",
    gold200: "#fbdfaf",
    gold300: "#fad087",
    gold400: "#f8c05f",
    gold500: "#f6b037",
    gold600: "#c58d2c",
    gold700: "#946a21",
    gold800: "#624616",
    gold900: "#31230b",

    orange100: "#ffedcc",
    orange200: "#ffdb99",
    orange300: "#ffc966",
    orange400: "#ffb733",
    orange500: "#ffa500",
    orange600: "#cc8400",
    orange700: "#996300",
    orange800: "#664200",
    orange900: "#332100",

    green100: "#cce6cc",
    green200: "#99cc99",
    green300: "#66b366",
    green400: "#339933",
    green500: "#008000",
    green600: "#006600",
    green700: "#004d00",
    green800: "#003300",
    green900: "#001a00",

    navbargreen: "#24b47e",
    navbarteal: "#4f96ce",
    navbarblue: "#6772e5",
    navbardarkblue: "#4f3ef5",

    darkblue100: "#cccce8",
    darkblue200: "#9999d1",
    darkblue300: "#6666b9",
    darkblue400: "#3333a2",
    darkblue500: "#00008b",
    darkblue600: "#00006f",
    darkblue700: "#000053",
    darkblue800: "#000038",
    darkblue900: "#00001c",

    red100: "#ffcccc",
    red200: "#ff9999",
    red300: "#ff6666",
    red400: "#ff3333",
    red500: "#ff0000",
    red600: "#cc0000",
    red700: "#990000",
    red800: "#660000",
    red900: "#330000",

    grey50: "#fafafa",
    grey100: "#f4f4f5",
    grey200: "#e4e4e7",
    grey300: "#d4d4d8",
    grey400: "#a1a1aa",
    grey500: "#71717a",
    grey600: "#52525b",
    grey700: "#3f3f46",
    grey800: "#27272a",
    grey900: "#18181b",

    black: "#222",
    white: "#fff",
    redLight: "#f8d7da",
    redDark: "#842029",
    greenLight: "#d1e7dd",
    greenDark: "#0f5132",
  },
  fonts: {
    headingFont:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    bodyFont:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    smallText: "0.7em",
  },
  backgroundColor: "#fafafa",
  textColor: "#18181b",
  borderRadius: ".25rem",
  letterSpacing: "1px",
  transition: "0.3s ease-in-out all",
  maxWidth: "1020px",
  fixedWidth: "700px",

  spacer: "28px",

  shadows: {
    shadow1: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    shadow2:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    shadow3:
      " 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    shadow4:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    lightShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
    darkShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
    otherShadow: "4px 4px 20px rgb(0 0 0 / 25%)",
  },
};

const spinner = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const bounce7 = keyframes`
  0% { transform: scale(1, 1) translateY(0); }
  10% { transform: scale(1.1, 0.9) translateY(0); }
  30% { transform: scale(0.9, 1.1) translateY(-10px); }
  50% { transform: scale(1.05, 0.95) translateY(0); }
  57% { transform: scale(1, 1) translateY(-2px); }
  64% { transform: scale(1, 1) translateY(0); }
  100% { transform: scale(1, 1) translateY(0); }
`;

const GlobalStyle = createGlobalStyle`
html {
    font-size: 100%;
  }
  body {
    background: ${theme.backgroundColor};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 500;
    line-height: 1.5;
    color: ${theme.colors.grey700};
  }
  
  p {
    max-width: ${theme.fixedWidth};
    margin-bottom: 1.25rem;
    color: ${theme.colors.grey700};
    font-size: 18px;
    font-weight: 400;
  }
  h1,
  h2,
  h3,
  h4,
  h5 {
    margin: 0;
    margin-bottom: .75rem;
    font-family: ${theme.fonts.headingFont};
    font-weight: 600;
    line-height: 1.25;
    text-transform: capitalize;
    letter-spacing: ${theme.letterSpacing};
  }
  h1 {
  font-size: 4.5rem;
}
h2 {
  font-size: 2rem;
}
h3 {
  font-size: 1.5rem;
}
h4 {
  font-size: 1rem;
}
h5 {
  font-size: 0.825rem;
}
@media ${theme.mediaQueries.tabletL} {
  h1,
  h2,
  h3,
  h4,
  h5 {
    line-height: 1;
  }
}
@media ${theme.mediaQueries.tabletM} {
  h1
   {
    font-size: 3rem;
  }
}
  small,
  .text-small {
    font-size: ${theme.fonts.smallText};
  }
  a {
    text-decoration: none;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  article {
    margin: 1rem 0;
  }
  .img {
    width: 100%;
    display: block;
    object-fit: cover;
  }
  .alert {
    padding: 0.375rem 0.75rem;
    margin-bottom: 1rem;
    border-color: transparent;
    border-radius: ${theme.borderRadius};
  }
  .alert-danger {
    color: ${theme.colors.redDark};
    background: ${theme.colors.redLight};
  }
  .alert-success {
    color: ${theme.colors.greenDark};
    background: ${theme.colors.greenLight};
  }
  .form {
    width: 90vw;
    max-width: ${theme.fixedWidth};
    background: ${theme.backgroundColor};
    border-radius: ${theme.borderRadius};
    box-shadow: ${theme.shadows.shadow2};
    padding: 2rem 2.5rem;
    margin: 3rem auto;
  }
  .form-label {
    display: block;
    font-size: ${theme.fonts.smallText};
    margin-bottom: 0.5rem;
    text-transform: capitalize;
    letter-spacing: ${theme.letterSpacing};
  }
  .form-input,
  .form-textarea {
    width: 100%;
    padding: 0.375rem 0.75rem;
    border-radius: ${theme.borderRadius};
    background: ${theme.backgroundColor};
    border: 1px solid ${theme.colors.grey200};
  }
  .form-row {
    margin-bottom: 1rem;
  }
  .form-textarea {
    height: 7rem;
  }
  ::placeholder {
    font-family: inherit;
    color: ${theme.colors.grey400};
  }
  .form-alert {
    color: ${theme.colors.redDark};
    letter-spacing: ${theme.let};
    text-transform: capitalize;
  }
  .loading {
    width: 6rem;
    height: 6rem;
    border: 5px solid ${theme.colors.grey400};
    border-radius: 50%;
    border-top-color: ${theme.colors.blue500};
    animation: ${spinner} 0.6s linear infinite;
  }
  .loading {
    margin: 0 auto;
  }
  .title {
    text-align: center;
  }
  .title-underline {
    background: ${theme.colors.blue500};
    width: 7rem;
    height: 0.25rem;
    margin: 0 auto;
    margin-top: -1rem;
  }
  .footer {
    background-color: ${theme.colors.grey900};
  }
  .footer a {
    color: ${theme.colors.grey50};
  }
  .card {
    transition: transform 0.3s ease-in-out;
    border: transparent !important;
  }
  .card:hover {
    transform: scale(1.025);
    border: transparent !important;
  }
  /* .card:hover svg {
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-name: ${bounce7};
  animation-timing-function: cubic-bezier(0.28, 0.84, 0.42, 1);
} */
`;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;

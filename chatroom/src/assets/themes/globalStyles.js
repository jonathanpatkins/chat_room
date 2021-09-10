import theme from "./theme";

import { createGlobalStyle, keyframes } from "styled-components";

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

// const bounce = keyframes`
//   from {
//     transform: scale(1, 1);
//   }
//   to {
//     transform: scale(0.9, 0.9);
//   }
// `

const GlobalStyles = createGlobalStyle`
  /* font-family: 'Bitter', serif;
font-family: 'Domine', serif;
font-family: 'Montserrat', sans-serif;
font-family: 'Source Sans Pro', sans-serif; */
  
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

export default GlobalStyles;

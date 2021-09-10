require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "Chat",
  },
  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: "AIzaSyB47ZMyV6oUbh-n68_y734G8t47tUYPt7E",
          authDomain: "chat-6bb8e.firebaseapp.com",
          projectId: "chat-6bb8e",
          storageBucket: "chat-6bb8e.appspot.com",
          messagingSenderId: "126139751842",
          appId: "1:126139751842:web:3b41838513eb454fd866fb",
          measurementId: "G-X2KQ90S3B2",
        },
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
  ],
};

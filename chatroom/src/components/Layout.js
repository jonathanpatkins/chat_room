import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import GlobalStyles from "../assets/themes/globalStyles";

/*
Creates a wrapper for all pages which includes a navbar at the top and a footer at the bottom
*/
const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <GlobalStyles />
      <main>{children}</main>
    </React.Fragment>
  );
};

export default Layout;

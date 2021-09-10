// scope css locally
import React from "react";
import Layout from "../components/Layout";
import HelmetWrapper from "../components/HelmetWrapper";

import styled from "styled-components";

export default function Home(props) {
  return (
    <Layout>
      <HelmetWrapper title="Index" description="This is the index" />
    </Layout>
  );
}

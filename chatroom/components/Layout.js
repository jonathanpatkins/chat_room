import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Layout({ children, title }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main>{children}</main>
    </>
  );
}

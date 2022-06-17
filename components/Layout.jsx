import React from "react";
import Head from "next/head";
import { Navbar, Footer } from "./index";
const Layout = ({ children }) => {
  return (
    <div className='layout'>
      <Head>
        <title>Next Commerce with Sanity</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className='main-container'>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;

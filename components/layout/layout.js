import { Fragment, useEffect } from "react";
import Footer from "./footer/footer";
import Navbar from "./navbar/navbar";
import firebase from "../../firebase/firebase";
import Router from "next/router";

function Layout(props) {
  useEffect(() => {
    if (!firebase.isLoggedIn()) {
      Router.push("/");
    }
    if (!firebase.isVerified()) {
      Router.push("/verify-email");
    }
  }, []);

  return (
    <Fragment>
      <Navbar />
      <main>{props.children}</main>
    </Fragment>
  );
}

export default Layout;

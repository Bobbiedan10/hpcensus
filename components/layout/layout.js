import { Fragment, useEffect } from "react";
import ToggleSwitch from "../ui/toggle-switch";
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
      <main className=''>{props.children}</main>
      <ToggleSwitch />
    </Fragment>
  );
}

export default Layout;

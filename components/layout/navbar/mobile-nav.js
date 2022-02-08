import Link from "next/link";
import firebase from "../../../firebase/firebase";
import Router, { useRouter } from "next/router";
import classes from "./mobile-nav.module.css";

function MobileNav(props) {
  const router = useRouter();
  return (
    <div className={`${props.show ? "" : "hidden"}`}>
      <div className={classes.mobile_nav}>
        <Link href='/dashboard/'>
          <a
            onClick={props.onClick}
            className={
              router.pathname == "/dashboard" ? `${classes.active}` : ""
            }>
            Dashboard
          </a>
        </Link>
        <Link href='/dashboard/profile'>
          <a
            onClick={props.onClick}
            className={
              router.pathname == "/dashboard/profile" ? `${classes.active}` : ""
            }>
            Profile
          </a>
        </Link>
        <Link href=''>
          <a
            onClick={async () => {
              await firebase.logout();
              Router.push("/");
            }}>
            Logout
          </a>
        </Link>
      </div>
    </div>
  );
}
export default MobileNav;

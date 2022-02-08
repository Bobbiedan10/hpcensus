import Link from "next/link";
import firebase from "../../../firebase/firebase";
import Router, { useRouter } from "next/router";
import classes from "./primary-nav.module.css";

function PrimaryNav() {
  const router = useRouter();
  return (
    <div className={classes.navigation}>
      <Link href='/dashboard/'>
        <a
          className={
            router.pathname == "/dashboard" ? `${classes.active}` : ""
          }>
          Dashboard
        </a>
      </Link>
      <Link href='/dashboard/profile'>
        <a
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
  );
}

export default PrimaryNav;

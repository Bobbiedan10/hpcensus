import classes from "./navigation.module.css";
import Link from "next/link";
import PrimaryNav from "./primary-nav";
import MobileMenuBtn from "./mobile-menu-btn";

function Navigation(props) {
  return (
    <div className={classes.navigation}>
      <div className={classes.logo}>
        <Link href='/dashboard'>
          <a>
            Census Management
          </a>
        </Link>
      </div>
      <PrimaryNav />
      <MobileMenuBtn onClick={props.parentCallback} />
    </div>
  );
}

export default Navigation;

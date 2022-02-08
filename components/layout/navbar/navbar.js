import MobileNav from "./mobile-nav";
import classes from "./navbar.module.css";
import Navigation from "./navigation";
import { useState } from "react";

function Navbar() {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    console.log("clicked");
    setActive(!active);
  };

  return (
    <nav className={classes.navbar}>
      <div className={classes.container}>
        <Navigation parentCallback={handleClick} />
        <MobileNav onClick={handleClick} show={active} />
      </div>
    </nav>
  );
}

export default Navbar;

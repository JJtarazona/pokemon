import React from "react";
import styles from "../NavBar/NavBar.module.css";
import { Link } from "react-router-dom";
import PathRoutes from "../../Helpers/Routes.Helpers";
import Logo from "../../Image/logo.png";
import SearchBar from "../SearchBar/SearchBar";

function NavBar() {
  return (
    <div className={styles.container}>
      <div className={styles.navBar}>
        <Link to={PathRoutes.HOME}>
          <img src={Logo} alt="Pokemon logo" className={styles.logo} />
        </Link>
        <SearchBar />
        <Link to={PathRoutes.FORM}>
          <button>Nuevo Pokemon</button>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;

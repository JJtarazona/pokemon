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
        <div>
          <Link to={PathRoutes.HOME}>
            <img src={Logo} alt="Pokemon logo" className={styles.logo} />
          </Link>
        </div>
        <div className={styles.newContainer}>
          <SearchBar />
          <Link to={PathRoutes.FORM}>
            <button className={styles.newPoke}>Nuevo Pokemon</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;

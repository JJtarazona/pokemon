import React from "react";
import { Link } from "react-router-dom";
import styles from "../Landing/Landing.module.css";
import PathRoutes from "../../Helpers/Routes.Helpers";

function Landing() {
  return (
    <div className={styles.landing}>
      <h1 className={styles.h1}>Hola soy el Landing</h1>
      <Link to={PathRoutes.HOME}>Home</Link>
    </div>
  );
}

export default Landing;

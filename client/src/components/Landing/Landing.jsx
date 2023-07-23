import React from "react";
import { Link } from "react-router-dom";
import styles from "../Landing/Landing.module.css";
import PathRoutes from "../../Helpers/Routes.Helpers";
import image from "../../Image/pika.png";
import logo from "../../Image/logo.png";
import pikachu from "../../Image/pikachu-running.gif";

function Landing() {
  return (
    <div className={styles.glassBox}>
      <div className={styles.content}>
        <img className={styles.logo} src={logo} alt="logo" />
        <h1 className={styles.h1}>¡Conoce a todos los increíble Pokémon! 🌟</h1>
        <Link to={PathRoutes.HOME}>
          <button className={styles.buttonHome}>
            <div>
              <img className={styles.pikachu} src={pikachu} alt="Pokebola" />
            </div>
            <div>
              <h3>HOME</h3>
            </div>
          </button>
        </Link>
      </div>
      <div>
        <img className={styles.image} src={image} alt="pokemones" />
      </div>
    </div>
  );
}

export default Landing;

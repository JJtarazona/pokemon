import React from "react";
import styles from "../Card/Card.module.css";
import { Link } from "react-router-dom";
import PathRoutes from "../../Helpers/Routes.Helpers";

function Card({ name, img, types, id }) {
  return (
    <div className={styles.card}>
      <img className={styles.img} src={img} alt="Pokemon" />
      <Link to={PathRoutes.DETAIL.replace(":id", id)}>
        <h2 className={styles.h2}>{name}</h2>
      </Link>
      <h2 className={styles.h2}>{id}</h2>
      <h2 className={styles.types}>{types.join(" ")}</h2>
    </div>
  );
}

export default Card;

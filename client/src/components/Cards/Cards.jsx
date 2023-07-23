import React from "react";

function Cards(props) {
  const { name, img, types, id } = props;
  return (
    <div className={styles.mainDiv}>
      <h2 className={styles.h2}>{name}</h2>
      <img className={styles.img} src={img} alt="Pokemon" />
      <h2 className={styles.types}>{id}</h2>
      <h2 className={styles.types}>{types}</h2>
    </div>
  );
}

export default Cards;

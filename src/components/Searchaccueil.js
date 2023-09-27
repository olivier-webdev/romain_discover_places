import React from "react";
import styles from "../components/Searchaccueil.module.scss";

const Searchaccueil = () => {
  return (
    <div className={`d-flex ffcn jcc aic ${styles.searchContainer}`}>
        <h3>Une destination ?</h3>
        <p>Découvre les lieux insolites à proximité</p>
      <div className={`d-flex ffrn jcc aic ${styles.inputsearch}`}>
        <input type="text" placeholder="Rechercher un pays..." />
        <button><i className="fa-solid fa-magnifying-glass"></i></button>
      </div>
    </div>
  );
};

export default Searchaccueil;

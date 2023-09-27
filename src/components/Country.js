import React from "react";
import styles from "./../components/Tousguides.module.scss";
import { useNavigate } from "react-router-dom";

const Country = ({ countries }) => {
  const navigate = useNavigate();

  // console.log(countries);
  const toCountry = () => {
    navigate(`/country/${countries.idPays}`);
  };

  return (
    <div onClick={toCountry}>
      <div className={`p40 ${styles.pays}`} key={countries.idPays}>
        <div className={`${styles.img1}`}>
          <img src={countries.imgPays1} alt="" />
        </div>
        <p className="pt10">{countries.nomPays}</p>
      </div>
    </div>
  );
};

export default Country;

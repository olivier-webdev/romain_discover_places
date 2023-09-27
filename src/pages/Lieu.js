import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CountryDetail.module.scss";

const Lieu = ({ lieux }) => {
  const navigate = useNavigate();

  const toLieu = () => {
    navigate(`/lieu/${lieux?.idLieu}`);
  };

  return (
    <li onClick={toLieu} className="d-flex ffrn" key={lieux?.idLieu}>
      {/* <h5 className="d-flex aic">{index + 1}</h5> */}
      <div className={`${styles.imgIcone}`}>
        <img src={lieux?.img} alt="" />
      </div>
      <p>{lieux?.nomLieu}</p>
    </li>
  );
};

export default Lieu;

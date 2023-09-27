import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOnlyCountry } from "../apis/countries";
import Header from '../components/headers/Header';
import styles from "./CountryDetail.module.scss";
import { getLieuxbyCountry } from "../apis/lieux";
import Lieu from "./Lieu";

const CountryDetail = () => {

  let { id } = useParams();

  const [country, setCountry] = useState({});
  const [lieux, setLieux] = useState([]);


  useEffect(() => {
    async function fetchCountrybyId() {
      try {
        const response = await getOnlyCountry(id);
        setCountry(response);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCountrybyId();
  }, [id]);

  useEffect(() => {
    async function fetchLieux() {
      try {
        const response = await getLieuxbyCountry(id);
        setLieux(response);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLieux();
  }, [id]);

  return (
    <div>
      <Header />
      <div className={`${styles.detailContainer}`}>
        <div className={`${styles.imgcoverContainer}`}>
          <div className={`${styles.img2}`}>
            <img src={country.imgPays2} alt="" />
          </div>
          <h3>{country.nomPays}</h3>
        </div>
        <div className={`d-flex ffcn aic ${styles.infosCountry}`}>
          <div className={`${styles.description}`}>
            <p className="m40 p20">{country.description}</p>
          </div>
          <div className={`p20 d-flex ffrn jcsb ${styles.infos}`}>
            <p>
              <i className="pr12 fa-regular fa-money-bill-1"></i>
              {country.monnaie}
            </p>
            <p>
              <i className="pr12 fa-solid fa-user-group"></i>
              {country.population}
            </p>
            <p>
              <i className="pr12 fa-regular fa-comment-dots"></i>
              {country.langue}
            </p>
          </div>
          <div className={`mt50 ${styles.somContainer}`}>
            <h2 className="mb50 mt50">Les plus beaux endroits à découvir</h2>
            {lieux.length > 0 ? (
              <ul className="mb100">
                {lieux.map((l, index) => (
                  <Lieu key={index} lieux={l} />
                ))}
              </ul>
            ) : (
              <p>Aucun lieu disponible</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;

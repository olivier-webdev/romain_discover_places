// import React from 'react';
import Header from '../components/headers/Header';
import React, { useEffect, useState } from "react";
import styles from "./../components/Tousguides.module.scss";
import { getCountry } from "../apis/countries";
import { getContinents } from "../apis/continents";
// import { useNavigate } from 'react-router-dom';
import Country from '../components/Country';
// import Tousguides from '../components/Tousguides';

const Allguides = () => {

    // const navigate = useNavigate()

    const [continent, setContinent] = useState([]);
    const [countries, setCountries] = useState([]);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await getCountry(); // récupérer
        setCountries(response);   
      } catch (error) {
        console.error(error);
      }
    }
    fetchCountries();
  }, []);

  useEffect(() => {
    async function fetchContinents() {
      try {
        const response = await getContinents({}); // récupérer
        setContinent(response);   
      } catch (error) {
        console.error(error);
      }
    }
    fetchContinents();
  }, []);

//   const toCountry = () => {
    // navigate(`/country/${idPays}`);

//   }

    return (
        <div>
            <Header />
            {/* <Tousguides /> */}
            <div className={`d-flex ffcn ${styles.guidesContainer}`}>
        <div className={`${styles.presGuides}`}>
          <h4>Tous les guides</h4>
        </div>
        {continent.map((c) => (
        <div key={c.idContinent} className={`d-flex ffcn ${styles.guides}`}>
          <span></span>
          <h5>{c.nomContinent}</h5>
          <div className="d-flex ffrw ml30 mt20 mb50">
            {countries
            .filter((p) => p.idContinent === c.idContinent)
            .map((p, index) => (
              <Country key={index} countries={p}/>
            ))}
          </div>
        </div>
          ))}
      </div>
        </div>
    );
};

export default Allguides;
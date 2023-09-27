import React, { useEffect, useState } from "react";
import { getOnlyLieubyId } from "../apis/lieux";
import { useParams } from "react-router-dom";
import Header from '../components/headers/Header';
import styles from "./LieuDetail.module.scss";

const LieuDetail = () => {
  let { id } = useParams();

  const [lieu, setLieu] = useState({});

  useEffect(() => {
    async function fetchLieubyId() {
      try {
        const response = await getOnlyLieubyId(id);
        console.log(response);
        setLieu(response);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLieubyId();
  }, [id]);

  return (
    <div>
      <Header />
      <div className={`${styles.detailLieuContainer}`}>
        <div className={`${styles.imgcoverContainer}`}>
          <div className={`${styles.img2}`}>
            <div className={`${styles.test}`}></div>
            <img src={lieu.img} alt="" />
            <div className={`${styles.test2}`}></div>
          </div>
          <h3>{lieu?.nomLieu}</h3>
        </div>
        <div className={`d-flex ffnw jcc ${styles.infosLieu}`}>
          <div className={`p15 d-flex ffcn ${styles.infodescription}`}>
          <h4 className="mb10 ml10">Description</h4>
          <span></span>
          <p>{lieu.description}</p>
          </div>
          <div className={`p15 d-flex ffcn ${styles.infoLocation}`}>
            <div className={`ml10 mb10 d-flex ffrn aic`}>
              <i className="pr12 fa-solid fa-location-dot"></i>
              <h4>Localisation</h4>
            </div>
              <span></span>
            <p>{lieu.localisation}</p>
            <div className={`mt10 ml10 mb10 d-flex ffrn aic`}>
            <i class="pr12 fa-solid fa-map-location"></i>
              <h4>Adresse</h4>
            </div>
              <span></span>
            <p>{lieu.adresse}</p>
          </div>
        </div>
        <div className={`d-flex ffcn ${styles.imgsContainer}`}>
          <div className={`${styles.imgContainer}`}>
            <img src="https://www.nature-isere.fr/sites/default/files/images/espece/principale/tom_blackwell_cc_by-nc_2.0_grenouille_rousse_nature_isere.jpg" alt="" />
          </div>
          <div className={`${styles.imgsCarousel}`}>
          <div className={`${styles.imgCarousel}`}>
            <img src="https://www.nature-isere.fr/sites/default/files/images/espece/principale/tom_blackwell_cc_by-nc_2.0_grenouille_rousse_nature_isere.jpg" alt="" />
          </div>
          <div className={`${styles.imgCarousel}`}>
            <img src="https://www.nature-isere.fr/sites/default/files/images/espece/principale/tom_blackwell_cc_by-nc_2.0_grenouille_rousse_nature_isere.jpg" alt="" />
          </div>
          <div className={`${styles.imgCarousel}`}>
            <img src="https://www.nature-isere.fr/sites/default/files/images/espece/principale/tom_blackwell_cc_by-nc_2.0_grenouille_rousse_nature_isere.jpg" alt="" />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LieuDetail;

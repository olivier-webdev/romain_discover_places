import React, { useContext, useRef, useState } from "react";
import styles from "./Popupban.module.scss";
import { DataContext } from "../../context";

const Popupban = ({ close, u }) => {
  const [popupconfsupp, setPopupConfsupp] = useState(false);
  const containerRef = useRef(null);
  const { BanUser, DeleteUser } = useContext(DataContext)

  const handleSupp = () => {
    setPopupConfsupp(!popupconfsupp);
    containerRef.current.classList.add(styles.opaque);
    containerRef.current
      .querySelector(`.${styles.popChoose}`)
      .classList.add(styles.opaque);
  };
  
  async function ban(user) {
    try {
      await BanUser(user);
      close();
    } catch (error) {
      console.error(error);
    }
  }

  async function supp(user) {
    try {
      await DeleteUser(user);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <div ref={containerRef} className={`${styles.container}`}>
        <div className={`${styles.popContainer}`}>
          <i onClick={close} className="fa-solid fa-xmark"></i>
          <div className={`${styles.popChoose}`}>
            <p>
              Que voulez-vous faire de {u.prenom} {u.nom} ?
            </p>
            <div>
              <button onClick={() => ban(u)} className="mr20">
                Bannir
              </button>
              <button onClick={handleSupp} className={`${styles.Supp}`}>
                Supprimer
              </button>
            </div>
          </div>
        </div>
        {popupconfsupp && (
          <div className={`${styles.popConfirmation}`}>
            <p>Êtes-vous sûr ?</p>
            <div>
              <button
                className="mr20"
                onClick={() => {
                  supp(u);
                  close();
                }}
              >
                Oui
              </button>
              <button onClick={close}>Non</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Popupban;

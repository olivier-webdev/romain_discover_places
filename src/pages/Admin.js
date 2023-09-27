import React, { useEffect, useState } from "react";
import styles from "./Admin.module.scss";
import { getProps } from "../apis/prop";
import { NavLink } from "react-router-dom";
import HeaderAdmin from "../components/headers/HeaderAdmin";

const Admin = () => {
  // let { id } = useParams();
  // const [imageUrl, setImageurl] = useState(null);
  // useEffect(() => {
  //     async function fetchImagebyId() {
  //         try {
  //             const response = await getImage(id);
  //             const imageUrl = convertBase64ToImageUrl(response);
  //             setImageurl(imageUrl)
  //             console.log("test");
  //         } catch (error) {
  //             console.error(error);
  //         }
  //     }
  //     fetchImagebyId();
  // }, [id]);
  // function convertBase64ToImageUrl(base64) {
  //     const binaryString = window.atob(base64);
  //     const bytes = new Uint8Array(binaryString.length);
  //     for (let i = 0; i < binaryString.length; i++) {
  //       bytes[i] = binaryString.charCodeAt(i);
  //     }
  //     const blob = new Blob([bytes], { type: 'image/jpeg' });
  //     const imageUrl = URL.createObjectURL(blob);
  //     return imageUrl;
  //   }

  // const [props, setProps] = useState([]);

  // useEffect(() => {
  //   async function fetchProps() {
  //     try {
  //       const response = await getProps({});
  //       console.log(response);
  //       setProps(response);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   fetchProps();
  // }, []);

  // const getImageURL = async (filename) => {
  //   try {
  //     const response = await fetch(`http://localhost:8080/api/imgupload/image/${filename}`);
  //     const data = await response.json();
  //     return data.url;
  //   } catch (error) {
  //     console.error(error);
  //     return null;
  //   }
  // };

  // const formatDate = (date) => {
  //   const options = {
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //     hour: "numeric",
  //     minute: "numeric",
  //   };
  //   return new Date(date).toLocaleDateString("fr-FR", options)
  // };

  return (
    <div>
      <HeaderAdmin />
      <div className={`${styles.adminContainer}`}>
        <nav>
          <ul>
            <NavLink className="pr40" to="/manageuser">Gérer les utilisateurs</NavLink>
            <NavLink to="/admin">
              Gérer les formulaires
            </NavLink>
          </ul>
        </nav>
        </div>
      {/* <div className={`${styles.adminContainer}`}>
        {props.map((prop) => (
          <div key={prop.id} className={`${styles.propUser}`}>
            <div className={`${styles.propName}`}>
            <span>{prop.nom} {prop.prenom}</span>
            <h5>{formatDate(prop.dateprop)}</h5>
            </div>
            <p>Lieu : {prop.nomlieu}</p>
            <p>Pays : {prop.nompays}</p>
            <p>Commentaire : {prop.comment}</p>
            {prop.imageURL && <img src={prop.imageURL} alt="Image"/>}
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Admin;

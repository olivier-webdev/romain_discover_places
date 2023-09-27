// import React, { useEffect, useState } from "react";
// import styles from "./Tousguides.module.scss";
// import { getCountry } from "../apis/countries";
// import { getContinents } from "../apis/continents";

// const Tousguides = () => {
//   const [continent, setContinent] = useState([]);
//   const [countries, setCountries] = useState([]);

//   useEffect(() => {
//     async function fetchCountries() {
//       try {
//         const response = await getCountry({}); // récupérer
//         setCountries(response);   
//       } catch (error) {
//         console.error(error);
//       }
//     }
//     fetchCountries();
//   }, []);

//   useEffect(() => {
//     async function fetchContinents() {
//       try {
//         const response = await getContinents({}); // récupérer
//         setContinent(response);   
//       } catch (error) {
//         console.error(error);
//       }
//     }
//     fetchContinents();
//   }, []);

//   return (
//     <div>
//       <div className={`d-flex ffcn ${styles.guidesContainer}`}>
//         <div className={`${styles.presGuides}`}>
//           <h4>Tous les guides</h4>
//         </div>
//         {continent.map((c) => (
//         <div key={c.idContinent} className={`d-flex ffcn ${styles.guides}`}>
//           <span></span>
//           <h5>{c.nomContinent}</h5>
//           <div className="d-flex ffrw ml30 mt20 mb50">
//             {countries
//             .filter((p) => p.idContinent === c.idContinent)
//             .map((p) => (
//               <div className={`p40 ${styles.pays}`} key={p.idPays}>
//                 <div className={`${styles.img1}`}>
//                 <img src={p.imgPays1} alt="" />
//                 </div>
//                 <p className="pt10">{p.nomPays}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default Tousguides;

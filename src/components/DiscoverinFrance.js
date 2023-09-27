// import React, { useRef } from 'react';
// import styles from "./Momentplace.module.scss";

// const DiscoverinFrance = () => {
//     const carouselRef = useRef(null);

//   let currentIndex = 0;

//   const handlePrevClick = () => {
//     const images = document.querySelectorAll("img");
//     const prevIndex = (currentIndex - 1 + images.length) % images.length;
//     images[currentIndex].style.opacity = 0;
//     currentIndex = prevIndex;
//     images[currentIndex].style.opacity = 1;
//     images[currentIndex].style.transform = "translateX(0)";
//   };

//   const handleNextClick = () => {
//     const images = carouselRef.current.querySelectorAll("img");
//     const nextIndex = (currentIndex + 1) % images.length;
//     images[currentIndex].style.opacity = 0;
//     currentIndex = nextIndex;
//     images[currentIndex].style.opacity = 1;
//   };

//     return (
//         <div
//       className={`d-flex ffcn aic ${styles.franceContainer}`}
//       ref={carouselRef}
//     >
//       <h3 className="">Découvrir en France</h3>
//       <div className="carousel">
//         <img src="https://zupimages.net/up/23/13/pbwv.jpg" alt="image1" />
//         {/* <span>Wadi Bani Khalid, OMAN</span> */}
//         <img
//           src="https://tse3.mm.bing.net/th?id=OIP.Y96LpDfdEJ2f56SowM-pbAHaE8&pid=Api&P=0"
//           alt="image2"
//         />
//         {/* <span>Wadi Bani Khalid, OMAN</span> */}
//         <img
//           src="https://tse4.mm.bing.net/th?id=OIP.MLiVCA5uoQ341EhmcNcZVAHaFY&pid=Api&P=0"
//           alt="image3"
//         />
//         {/* <span>Wadi Bani Khalid, OMAN</span> */}
//         <button className="prev" onClick={handlePrevClick}>
//           <i className="fa fa-chevron-left"></i>
//         </button>
//         <button className="next" onClick={handleNextClick}>
//           <i className="fa fa-chevron-right"></i>
//         </button>
//         <span>Wadi Bani Khalid, OMAN</span>
//       </div>
//     </div>
//     );
// };

// export default DiscoverinFrance;
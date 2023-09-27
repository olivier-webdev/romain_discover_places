import React, { useEffect, useRef, useState } from "react";
import styles from "./Momentplace.module.scss";
import { getLieuxMoment } from "../apis/lieux";
// import { useParams } from "react-router-dom";

const Momentplace = () => {
  // let { id } = useParams();

  const carouselRef = useRef(null);
  const thumbnailRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lieu, setLieu] = useState([]);

  useEffect(() => {
    async function fetchMomentLieu() {
      try {
        const response = await getLieuxMoment();
        setLieu(response[0]);
        // setLieu([{ img: response[0].img }])
        console.log(response[0]);
        const images = Array.from(
          carouselRef.current.querySelectorAll(".img1")
        );
        images.forEach((image, index) => {
          image.src = response[0].img[index]; 
        });
      } catch (error) {
        console.error(error);
      }
    }
    fetchMomentLieu();
    const interval = setInterval(fetchMomentLieu, 24 * 60 * 60 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handlePrevClick = () => {
    const images = carouselRef.current.querySelectorAll(".img1");
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    images[currentIndex].style.opacity = 0;
    setCurrentIndex(prevIndex);
    // currentIndex = prevIndex;
    images[prevIndex].style.opacity = 1;
    images[prevIndex].style.transform = "translateX(0)";
  };

  const handleNextClick = () => {
    const images = carouselRef.current.querySelectorAll(".img1");
    const nextIndex = (currentIndex + 1) % images.length;
    images[currentIndex].style.opacity = 0;
    setCurrentIndex(nextIndex);
    // currentIndex = nextIndex;
    images[nextIndex].style.opacity = 1;
    images[nextIndex].style.transform = "translateX(0)";
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div
      className={`d-flex ffcn aic ${styles.momentContainer}`}
    >
      <h3 className="">Lieu insolite du moment</h3>
      <div className={`carousel ${styles.imgContainer}`} ref={carouselRef}>
            <img
              className={`img1  ${styles.active}`}
              src={lieu.img}
              alt={`image 1}`}
            />
        <button className="prev" onClick={handlePrevClick}>
          <i className="fa fa-chevron-left"></i>
        </button>
        <button className="next" onClick={handleNextClick}>
          <i className="fa fa-chevron-right"></i>
        </button>
        <span>{lieu.nomLieu}</span>
      </div>
      <div className="defilcarousel" ref={thumbnailRef}>
        {/* {lieu.img && lieu.img.map((imageUrl, index) => ( */}
            <div
              className="imgdefil"
              // onClick={() => handleThumbnailClick(index)}
            >
              <img src={lieu.img} alt={`image 1}`} />
            </div>
          {/* ) */}
        {/* )} */}
      </div>
    </div>
  );
};

export default Momentplace;

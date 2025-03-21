import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperInstance } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import thirdIlust from "../../../assets/Ilus1.jpg";
import thirdBackground from "../../../assets/red-blue BKG.jpg";
import fourthIlust from "../../../assets/Ilus3.jpg";
import fourthBackground from "../../../assets/rose BKG.jpg";

const banners = [
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod perspiciatis ad possimus.",
    img: thirdIlust,
    bg: thirdBackground,
    borderColor: "#F26932",
  },
  {
    text: "Rem, earum. Quod perspiciatis ad possimus consequuntur aut, beatae veritatis molestiae obcaecati.",
    img: fourthIlust,
    bg: fourthBackground,
    borderColor: "#F26932",
  },
];

export const Second_Interactive_Banner = () => {
  const [swiperRef, setSwiperRef] = useState<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleMouseUpGlobal = () => {
      setIsDragging(false);
    };

    document.addEventListener("mouseup", handleMouseUpGlobal);
    return () => {
      document.removeEventListener("mouseup", handleMouseUpGlobal);
    };
  }, []);

  return (
    <div className="banner-container">
      <div className="banner-child-container">
        {/* Sección de Texto */}
        <div className="text-banner-area">
          {banners.map((banner, index) => (
            <p
              key={index}
              className={`text-action ${
                activeIndex === index ? "text-active" : "text-inactive"
              }`}
              style={{ borderColor: activeIndex === index ? banner.borderColor : "transparent" }}
              onClick={() => swiperRef?.slideTo(index)}
            >
              {banner.text}
            </p>
          ))}
        </div>

        {/* Sección de Imágenes con Swiper */}
        <div className="carousel-container">
          <Swiper
            onSwiper={setSwiperRef}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            spaceBetween={50}
            slidesPerView={1}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className={`w-full h-full ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
          >
            {banners.map((banner, index) => (
              <SwiperSlide key={index}>
                <div className="ilustration-banner-area">
                  <img
                    src={banner.bg}
                    alt="Background"
                    className="ilustration-background"
                    style={{ borderColor: banner.borderColor }}
                  />
                  <img
                    src={banner.img}
                    alt="Illustration"
                    className="ilustration"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
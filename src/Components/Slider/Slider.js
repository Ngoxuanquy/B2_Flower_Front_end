import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles

import { Pagination } from "swiper/modules";

import "./Slider.css";
import { Image, Carousel } from "antd";

function Sliders() {
  const contentStyle = {
    margin: 0,
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  return (
    <>
      <Carousel arrows dotGap={4} infinite={false} slidesToShow={4}>
        <SwiperSlide>
          <Image
            src="https://res.cloudinary.com/dvqmndx5j/image/upload/v1698825956/banhang/cq5dxtvrcssx6lsphmni.jpg"
            style={{
              width: "250px",
              height: "250px",
            }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="https://res.cloudinary.com/dvqmndx5j/image/upload/v1698825956/banhang/cq5dxtvrcssx6lsphmni.jpg"
            style={{
              width: "250px",
              height: "250px",
            }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="https://res.cloudinary.com/dvqmndx5j/image/upload/v1698825956/banhang/cq5dxtvrcssx6lsphmni.jpg"
            style={{
              width: "250px",
              height: "250px",
            }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="https://res.cloudinary.com/dvqmndx5j/image/upload/v1698825956/banhang/cq5dxtvrcssx6lsphmni.jpg"
            style={{
              width: "250px",
              height: "250px",
            }}
          />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <Image
            src="https://res.cloudinary.com/dvqmndx5j/image/upload/v1698825956/banhang/cq5dxtvrcssx6lsphmni.jpg"
            style={{
              width: "250px",
              height: "250px",
            }}
          />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <Image
            src="https://res.cloudinary.com/dvqmndx5j/image/upload/v1698825956/banhang/cq5dxtvrcssx6lsphmni.jpg"
            style={{
              width: "250px",
              height: "250px",
            }}
          />
        </SwiperSlide>
      </Carousel>
    </>
  );
}

export default Sliders;

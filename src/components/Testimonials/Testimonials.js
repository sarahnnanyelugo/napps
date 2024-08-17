// src/SliderComponent.js
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./testimonials.scss";

const Testimonials = ({ slides }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    centerPadding: "10px",
  };

  return (
    <Slider {...settings}>
      {slides.map((slide, index) => (
        <div key={index} className="slide col-md-4">
          <center>
            {" "}
            <p>{slide.title}</p>
            <img src={slide.image} alt="" width="44px" />
          </center>
        </div>
      ))}
    </Slider>
  );
};

export default Testimonials;

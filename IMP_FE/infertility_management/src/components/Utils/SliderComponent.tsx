import React from 'react';
import Slider from 'react-slick';

// Import slick styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Optional: Your own CSS class styles should still be globally available

const SliderComponent: React.FC = () => {
  const settings = {
  dots: true,
  infinite: true,
  speed: 500,              // Lower for faster transitions, higher for smoother
  autoplay: true,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: false,             // Disable fade to allow real sliding motion
  cssEase: 'ease-in-out',  // Smooth easing transition
  swipe: true,
  touchMove: true,
  draggable: true,
};


  const slides = [
    {
      background: 'assets/img/slider/slider-1.jpg',
      title: 'Our mission',
      description:"At our fertility treatment center, we are committed to supporting couples on their journey to parenthood. With a team of experienced doctors, modern facilities, and personalized care, we offer comprehensive fertility solutions including IUI, IVF, and more. Our mission is to bring hope and results through professionalism and compassion",
      buttonText: 'About Us',
      buttonLink: '#about',
    },
    {
      background: 'assets/img/slider/slider-2.jpg',
      title: 'Best Doctors you can found',
      description:"Our dedicated fertility specialists bring years of expertise in reproductive medicine. Each doctor is highly qualified, specializing in IUI, IVF, and advanced diagnostics. With a deep understanding of each patient’s unique situation, our doctors provide personalized treatment plans and attentive care throughout the journey",
      buttonText: 'View more Doctors',
      buttonLink: '#doctors',
    },
    {
      background: 'assets/img/slider/slider-3.jpg',
      title: 'Our Healthcare Treatments',
      description: "We offer a wide range of fertility treatmens including Intrauterine Insemination (IUI), In Vitro Fertilization (IVF), and hormone therapy. Our system allows patients to register services, choose their preferred doctor, and track every step of the treatment process — from medication schedules to pregnancy results",
      buttonText: 'View more treatments',
      buttonLink: '#treatment',
    },
  ];

  return (
    <div className="slider-wrapper">
      <section className="slider-section">
        <Slider {...settings} className="slider-active slick-style">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="single-slider img-bg"
              style={{
                backgroundImage: `url(${slide.background})`,
              }}
            >
              <div className="container">
                <div className="row">
                  <div className="col-xl-7 col-lg-8 col-md-10">
                    <div className="slider-content">
                      <h1
                        data-animation="fadeInDown"
                        data-duration="1.5s"
                        data-delay=".5s"
                      >
                        {slide.title}
                      </h1>
                      <p
                        data-animation="fadeInLeft"
                        data-duration="1.5s"
                        data-delay=".7s"
                      >
                        {slide.description}
                      </p>
                      <a
                        href={slide.buttonLink}
                        className="btn theme-btn page-scroll"
                        data-animation="fadeInUp"
                        data-duration="1.5s"
                        data-delay=".9s"
                      >
                        {slide.buttonText}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>
    </div>
  );
};

export default SliderComponent;

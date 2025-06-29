import React from 'react';
import backgroundImage from '../assets/img/bg/footer-bg.jpg'; // adjust if needed
import IMP_logo from '../assets/img/logo/IMP_logo.jpg'; // adjust if needed

const Contact = () => {
  return (
    <div>
      {/* About Section */}
      <section id="about" className="about-section pt-120">
        <div className="shape shape-2">
          <img src="assets/img/shapes/shape-2.svg" alt="" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xl-10 col-lg-11 mx-auto">
              <div className="about-content text-center mb-55">
                <div className="section-title mb-30">
                  <span className="wow fadeInDown" data-wow-delay=".2s">About Us</span>
                  <h2 className="mb-15 wow fadeInUp" data-wow-delay=".4s">Welcome to IMP</h2>
                </div>
                <p className="mb-35 wow fadeInUp" data-wow-delay=".6s">
                  At our fertility treatment center, we understand that every journey to parenthood is deeply personal...
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="about-img text-center">
          <img src="assets/img/about/about-img.png" alt="" />
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="contact-info-section py-100 bg-light">
        <div className="container">
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-8">
              <h2 className="fw-bold mb-3">Contact Information</h2>
              <p className="text-muted">We’re here to assist you. Feel free to reach out anytime!</p>
            </div>
          </div>

          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="p-4 shadow-sm rounded bg-white h-100">
                <i className="lni lni-map-marker fs-2 text-primary mb-3"></i>
                <h5 className="fw-bold">Address</h5>
                <p className="mb-0">7 Đ. D1, Long Thạnh Mỹ, Thủ Đức, Hồ Chí Minh 700000, Vietnam</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="p-4 shadow-sm rounded bg-white h-100">
                <i className="lni lni-envelope fs-2 text-primary mb-3"></i>
                <h5 className="fw-bold">Email</h5>
                <p className="mb-0">infertility_management@gmail.com</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="p-4 shadow-sm rounded bg-white h-100">
                <i className="lni lni-phone fs-2 text-primary mb-3"></i>
                <h5 className="fw-bold">Phone</h5>
                <p className="mb-0">(+84) 123 456 789</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

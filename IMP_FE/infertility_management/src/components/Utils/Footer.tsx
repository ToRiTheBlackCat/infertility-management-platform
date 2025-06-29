import React from 'react';
import backgroundImage from '../../assets/img/bg/footer-bg.jpg'; // adjust path if needed
import IMP_logo from '../../assets/img/logo/IMP_logo.jpg'; // also import the logo for consistency

const Footer = () => {
  return (
    <footer
      className="footer pt-100 img-bg"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="container">
        <div className="footer-widget-wrapper">
          <div className="row">
            <div className="col-xl-4 col-lg-5 col-md-6">
              <div className="footer-widget mb-30">
                <a href="index.html" className="logo">
                  <img src={IMP_logo} alt="Logo" />
                </a>
                <p>
                  Lorem ipsum dolor serit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                  tempor invidunt ut labore dolore magna aliquyam erat diam voluptua.
                </p>
                <div className="footer-social-links">
                  <ul>
                    <li><a href="#"><i className="lni lni-facebook-filled"></i></a></li>
                    <li><a href="#"><i className="lni lni-twitter-filled"></i></a></li>
                    <li><a href="#"><i className="lni lni-linkedin-original"></i></a></li>
                    <li><a href="#"><i className="lni lni-instagram-original"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-xl-2 col-lg-3 col-md-6">
              <div className="footer-widget mb-30">
                <h4>Quick Link</h4>
                <ul className="footer-links">
                  <li><a href="/">Home</a></li>
                  <li><a href="/bookings">Bookings</a></li>
                  <li><a href="/treatments">Treatment</a></li>
                  <li><a href="/doctors">Doctor</a></li>
                  <li><a href="/blogs">Blog</a></li>
                  <li><a href="/contacts">Contact</a></li>
                </ul>
              </div>
            </div>
            <div className="col-xl-4 col-lg-12 col-md-7">
              <div className="footer-widget mb-30">
                <h4>Medical Location</h4>
                <div className="map-canvas">
                  <iframe
                    className="map"
                    id="gmap_canvas"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.6336816809945!2d106.8073081!3d10.8411276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2sFPT%20University%20HCMC!5e0!3m2!1sen!2s!4v1719659836892!5m2!1sen!2s"
                    style={{ width: '100%', height: '250px', border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="FPT University HCMC Location"
                  ></iframe>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="copyright-area">
          <p className="mb-0 text-center">
            Designed and Developed By <a href="https://github.com/ToRiTheBlackCat/infertility-management-platform" rel="nofollow">IMP Team</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { NavLink } from 'react-router-dom';

const treatments = [
  {
    title: 'Intrauterine Insemination (IUI)',
    image: '/assets/img/treatments/iui.jpg',
    description: 'A type of artificial insemination that places sperm inside the uterus to facilitate fertilization.',
    // link: '/treatments/iui'
  },
  {
    title: 'In Vitro Fertilization (IVF)',
    image: '/assets/img/treatments/ivf.jpg',
    description: 'A fertility treatment where eggs and sperm are combined outside the body, then implanted in the uterus.',
    // link: '/treatments/ivf'
  },
  {
    title: 'Egg Freezing',
    image: '/assets/img/treatments/egg-freezing.jpg',
    description: 'A method of preserving a woman’s fertility for future use.',
    // link: '/treatments/egg-freezing'
  },
  {
    title: 'Male Fertility Treatments',
    image: '/assets/img/treatments/male-fertility.jpg',
    description: 'Treatments and diagnostics for male infertility issues.',
    // link: '/treatments/male-fertility'
  }
];

const Treatment = () => {
  return (
    <section id="treatment" className="service-section pt-150 pb-120">
      <div className="shape shape-3">
        <img src="assets/img/shapes/shape-3.svg" alt="" />
      </div>
      <div className="container">
        <div className="row justify-content-center mb-55">
          <div className="col-xl-8 text-center">
            <div className="section-title">
              <span className="wow fadeInDown" data-wow-delay=".2s">Treatments</span>
              <h2 className="mb-15 wow fadeInUp" data-wow-delay=".4s">Infertility Treatment Services</h2>
              <p className="wow fadeInUp" data-wow-delay=".6s">
                We offer a range of advanced infertility treatments tailored to support your journey to parenthood.
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          {treatments.map((treatment, index) => (
            <div className="col-lg-6 col-md-6 mb-30" key={index}>
              <div className="service-item d-flex align-items-start flex-column h-100">
                <div className="service-icon mb-20 w-100">
                  <img src={treatment.image} alt={treatment.title} className="img-fluid rounded" />
                </div>
                <div className="service-content">
                  <h4>{treatment.title}</h4>
                  <p>{treatment.description}</p>
                  <NavLink to="/treatment-detail" className="read-more">
                    Learn More <i className="lni lni-arrow-right"></i>
                  </NavLink>
                </div>
                <div className="service-overlay img-bg"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Treatment;


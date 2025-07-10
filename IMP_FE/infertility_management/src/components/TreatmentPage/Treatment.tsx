import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchTreatment } from '../../service/authService';
import { TreatmentData } from '../../types/common';
import FptUImg from '../../assets/img/fptu.jpg'


const Treatment = () => {
  const [treatments, setTreatments] = useState<TreatmentData[]>([]);
  useEffect(() => {
    const getTreatments = async () => {
      try {
        const data = await fetchTreatment();
        if (data) {
          setTreatments(data);
        } else {
          console.error('No treatments found');
        }
      } catch (error) {
        console.error('Error fetching treatments:', error);
      }
    };
    getTreatments();
  },[]);
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
                  <img src={FptUImg} alt={treatment.treatmentName} className="img-fluid rounded" />
                </div>
                <div className="service-content">
                  <h4>{treatment.treatmentName}</h4>
                  {/* <p>{treatment.description}</p> */}
                  <NavLink to={`/treatment-detail/${treatment.treatmentId}`} className="read-more">
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


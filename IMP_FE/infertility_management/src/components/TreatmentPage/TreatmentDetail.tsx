import React, { useEffect, useState } from 'react';
import backgroundImage from '../assets/img/bg/footer-bg.jpg'; // adjust path if needed
import FptUImg from "../../assets/img/fptu.jpg"; // also import the logo for consistency
import { NavLink, useParams } from 'react-router-dom';
import { fetchTreatmentById, fetchTreatmentSteps } from '../../service/authService';
import { TreatmentData, TreatementStepData } from '../../types/common';
import { get } from 'http';


const TreatmentDetail = () => {
  const [treatment, setTreatment] = useState<TreatmentData>();
  const [treatmentSteps, setTreatmentSteps] = useState<TreatementStepData[]>([]);
  const { id } = useParams();

  useEffect(() => {
    const treatmentId = id ? parseInt(id) : 0;
    const getTreatmentDetail = async () => {
      try {
        const response = await fetchTreatmentById(treatmentId);
        if (response) {
          setTreatment(response);
        } else {
          console.error('No treatment found');
        }
      } catch (error) {
        console.error('Error fetching treatment details:', error);
      }
    };
    const getTreatmentSteps = async () => {
      try {
        const response = await fetchTreatmentSteps(treatmentId);
        if (response) {
          setTreatmentSteps(response);
        } else {
          console.error('No treatment steps found');
        }
      } catch (error) {
        console.error('Error fetching treatment steps:', error);
      }
    }
    getTreatmentSteps();
    getTreatmentDetail();
  }, [id]);

  return (
    <div className="treatment-page">
      {/* Header Section */}
      <section className="page-banner text-center py-100 bg-light" style={{ padding: '30px 0' }}>
        <div className="container d-flex">
          <span><NavLink to="/" className="nav-item">
            <a className="btn theme-btn "
              data-animation="fadeInUp"
              data-duration="1.5s"
              data-delay=".9s">Back</a>
          </NavLink></span>
          <span>
            <h2 className="wow fadeInUp" data-wow-delay=".2s">{treatment?.treatmentName}</h2>
            {/* <p className="text-muted wow fadeInUp" data-wow-delay=".4s">{treatment?.description}</p> */}
          </span>
        </div>
      </section>

      {/* Treatment Info */}
      <section className="treatment-info py-100" style={{ padding: '30px 0' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img src={FptUImg} alt={treatment?.treatmentName} className="img-fluid rounded shadow" />
            </div>
            <div className="col-lg-6">
              <h3 className="mb-3">Overview</h3>
              {treatment?.description?.split('\\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))}
              <p><strong>Specialization:</strong> {treatment?.expertField?.expertFieldName}</p>
              <p><strong>Average Rating:</strong> {treatment?.ratingScore} ⭐</p>
            </div>
          </div>
        </div>
      </section>
      <section className="treatment-steps-section py-100 bg-light">
        <div className="container">
          <h3 className="text-center mb-5">Treatment Steps</h3>

          {treatmentSteps.length === 0 ? (
            <p className="text-center">No steps found for this treatment.</p>
          ) : (
            <ul className="list-group">
              {treatmentSteps.map((step, index) => (
                <li key={step.stepId} className="list-group-item">
                  <h5>Step {index + 1}</h5>
                  {step.description
                    .replace(/\\r/g, '')         // Bỏ \r nếu có
                    .replace(/\\t/g, '    ')     // Thay \t bằng 4 dấu cách
                    .replace(/\\n/g, '\n')       // Thay \n về newline thật
                    .split('\n')                 // Tách dòng
                    .map((line, idx) => (
                      <p key={idx}>{line}</p>    // Hiển thị từng dòng
                    ))}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Treatment Timeline */}
      {/* <section className="treatment-steps-section py-100 bg-light">
        <div className="container">
          <h3 className="text-center mb-5">Treatment Procedure Steps</h3>
          <div className="timeline">
            {treatment.treatmentSteps.map((step, index) => (
              <div className="timeline-step" key={index}>
                <div className="step-dot"></div>
                <div className="step-content">
                  <h5>Step {index + 1}: {step.title}</h5>
                  <p>{step.description}</p>
                  {step.details.map((detail, i) => (
                    <div key={i} className="step-detail mb-2">
                      <i className="lni lni-checkmark-circle me-2 text-success"></i>
                      {detail.description}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Call to Action */}
      <div className="text-center mt-5 pb-5">
        <a
          href="/bookings"
          className="btn theme-btn page-scroll"
          data-animation="fadeInUp"
          data-duration="1.5s"
          data-delay=".9s"
        >
          Book This Treatment
        </a>
      </div>
    </div>
  );
};

export default TreatmentDetail;

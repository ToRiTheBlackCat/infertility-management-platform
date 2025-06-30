import React from 'react';
import backgroundImage from '../assets/img/bg/footer-bg.jpg'; // adjust path if needed
import IMP_logo from '../assets/img/logo/IMP_logo.jpg'; // also import the logo for consistency
import { NavLink } from 'react-router-dom';


const TreatmentDetail = () => {
  const treatment = {
    treatmentName: 'Intrauterine Insemination (IUI)',
    description:
      'IUI is a type of artificial insemination that involves placing sperm inside a woman’s uterus to facilitate fertilization.',
    image: 'anh.jpg',
    ratingScore: 4.7,
    price: '$10000',
    expertFieldName: 'Infertility Treatment',
    link: '/treatments/',
    treatmentSteps: [
      {
        title: 'Pre-Treatment Evaluation',
        description: 'Initial consultations, blood work, ultrasound, and semen analysis.',
        details: [
          { description: 'Hormonal blood tests' },
          { description: 'Pelvic ultrasound' },
          { description: 'Semen evaluation' }
        ]
      },
      {
        title: 'Ovulation Monitoring',
        description: 'Tracking the growth and release of eggs using ultrasound and hormone testing.',
        details: [
          { description: 'Follicle tracking by ultrasound' },
          { description: 'LH surge monitoring' }
        ]
      },
      {
        title: 'Sperm Preparation & Insemination',
        description: 'Washing and inserting sperm into uterus using catheter.',
        details: [
          { description: 'Sperm washing' },
          { description: 'Catheter insertion' }
        ]
      },
      {
        title: 'Post Procedure & Follow-up',
        description: 'Patient rests shortly after the procedure and returns for pregnancy test.',
        details: [
          { description: 'Rest for 10-15 minutes after IUI' },
          { description: 'Follow-up pregnancy blood test after 2 weeks' }
        ]
      }
    ]
  };

  return (
    <div className="treatment-page">
      {/* Header Section */}
      <section className="page-banner text-center py-100 bg-light" style={{ padding: '30px 0' }}>
        <div className="container d-flex">
          <span><NavLink to={treatment.link} className="nav-item">
                      <a className="btn theme-btn "
            data-animation="fadeInUp"
            data-duration="1.5s"
            data-delay=".9s">Back</a>
          </NavLink></span>
          <span>
          <h2 className="wow fadeInUp" data-wow-delay=".2s">{treatment.treatmentName}</h2>
          <p className="text-muted wow fadeInUp" data-wow-delay=".4s">{treatment.description}</p>
        </span>
        </div>
      </section>

      {/* Treatment Info */}
      <section className="treatment-info py-100" style={{ padding: '30px 0' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img src={treatment.image} alt={treatment.treatmentName} className="img-fluid rounded shadow" />
            </div>
            <div className="col-lg-6">
              <h3 className="mb-3">Overview</h3>
              <p>{treatment.description}</p>
              <p><strong>Price:</strong> {treatment.price}</p>
              <p><strong>Specialization:</strong> {treatment.expertFieldName}</p>
              <p><strong>Average Rating:</strong> {treatment.ratingScore} ⭐</p>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Timeline */}
      <section className="treatment-steps-section py-100 bg-light">
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
      </section>

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

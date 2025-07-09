import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchDoctor } from '../../service/authService';
import { DoctorData } from '../../types/common';
import doctorImg from '../../assets/img/doctor.jpg'; 
import doctorSpeciality from "../../assets/img/doctorSpeciality.jpg";

const Doctor = () => {
  const [doctors, setDoctors] = useState<DoctorData[]>([]);
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctorData = await fetchDoctor();
        if (doctorData) {
          setDoctors(doctorData);
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    fetchDoctors();
  }, []);
  return (
    <section id="doctors" className="service-section pt-150">
      <div className="container">
        <div className="row">
          <div className="col-xl-8 mx-auto">
            <div className="section-title text-center mb-55">
              <h2 className="mb-15 wow fadeInUp" data-wow-delay=".2s">Meet Our Doctors</h2>
              <p className="wow fadeInUp" data-wow-delay=".4s">
                Our dedicated fertility specialists bring years of expertise in reproductive medicine. Each doctor is highly qualified, specializing in IUI, IVF, and advanced diagnostics. With a deep understanding of each patient’s unique situation, our doctors provide personalized treatment plans and attentive care throughout the journey.
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          {doctors.map((doctor, index) => (
            <div className="col-lg-3 col-md-6" key={index}>
              <div className="service-item text-center mb-30">
                <div className="doctor-img mb-20">
                  <img src={doctorImg} alt={doctor.fullName} className="img-fluid rounded" />
                </div>
                <div className="service-icon mb-15">
                  <img src={doctorSpeciality} alt={`${doctor.degree} icon`} />
                </div>
                <div className="service-content">
                  <h5 className="mb-5">{doctor.fullName}</h5>
                  <p className="text-muted">{doctor.degree}</p>
                </div>
                <div className="service-overlay img-bg"></div>
                <div className="col-12">
                  {/* <a
                    href="#"
                    className="btn theme-btn page-scroll"
                    data-animation="fadeInUp"
                    data-duration="1.5s"
                    data-delay=".9s"
                  >
                    Check schedule
                  </a> */}
                   <NavLink to={`/doctor-schedule/${doctor.doctorId}`} className="read-more">
                    <a
                    className="btn theme-btn page-scroll"
                    data-animation="fadeInUp"
                    data-duration="1.5s"
                    data-delay=".9s"
                  >
                    Check schedule
                  </a>
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Doctor;

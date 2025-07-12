import React, { useEffect, useState } from 'react';
import { fetchTreatment, fetchDoctor } from '../../service/authService';
import { DoctorData, TreatmentData } from '../../types/common';
import TreatementImg from "../../assets/img/OIP.jpg"
import doctor_img from "../../assets/img/doctor.jpg";
import "../../assets/css/body.css";

const Body = () => {
  const [treatments, setTreatments] = useState<TreatmentData[]>([]);
  const [doctors, setDoctors] = useState<DoctorData[]>([]);

  useEffect(() => {
    const getTreatments = async () => {
      try {
        const response = await fetchTreatment();
        if (response) {
          setTreatments(response);
        } else {
          console.error('No treatments found');
        }
      } catch (error) {
        console.error('Error fetching treatments:', error);
      }
    };
    const getDoctors = async () => {
      try {
        const response = await fetchDoctor();
        if (response) {
          setDoctors(response);
        } else {
          console.error('No doctors found');
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    getDoctors();
    getTreatments();
  }, []);
  return (
    <div>
      {/* About Us */}
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
                  At our fertility treatment center, we understand that every journey to parenthood is deeply personal and sometimes filled with challenges. That’s why we are dedicated to providing compassionate, personalized, and effective fertility care.

                  Our clinic specializes in assisting couples and individuals facing infertility, offering advanced reproductive treatments such as Intrauterine Insemination (IUI), In Vitro Fertilization (IVF), and hormone therapies. Through a patient-centered approach, we not only focus on medical excellence but also on emotional support throughout every step of the treatment process.

                  We combine state-of-the-art medical technology with a seamless software platform that enables users to register for services, select their preferred fertility specialist, and manage their treatment schedules all in one place. From medication reminders, appointment bookings, to monitoring fertility milestones — everything is designed for simplicity and transparency.

                  With a team of certified and experienced doctors, nurses, and care coordinators, we are committed to walking alongside our patients, offering clear communication, timely care, and continuous updates to help increase the chances of success. Your dream of having a child is our mission.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="about-img text-center">
          <img src="assets/img/about/about-img.png" alt="" />
        </div>
      </section>

      {/* Treatment section */}
      <section id="treatment" className="service-section pt-150">
        <div className="shape shape-3">
          <img src="assets/img/shapes/shape-3.svg" alt="" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xl-8 mx-auto">
              <div className="section-title text-center mb-55">
                <span className="wow fadeInDown" data-wow-delay=".2s">Treatments</span>
                <h2 className="mb-15 wow fadeInUp" data-wow-delay=".4s">Our Healthcare Treatments</h2>
                <p className="wow fadeInUp" data-wow-delay=".6s">
                  We offer a wide range of fertility services including Intrauterine Insemination (IUI), In Vitro Fertilization (IVF), and hormone therapy. Our system allows patients to register services, choose their preferred doctor, and track every step of the treatment process — from medication schedules to pregnancy results
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Example Service Item */}
            {treatments.map((service, index) => (
              <div className="col-lg-4 col-md-6" key={index}>
                <div className="service-item mb-30">
                  <div className="service-icon mb-25">
                    <img src={TreatementImg} alt={`${service.treatmentName} icon`} />
                  </div>
                  <div className="service-content">
                    <h4>{service.treatmentName}</h4>
                    <p>Lorem ipsum dolor sit amet, consetet sadipscing elitr, sed dinonumy eirmod tempor invidunt.</p>
                    <a href={`/treatment-detail/${service.treatmentId}`} className="read-more">Read More <i className="lni lni-arrow-right"></i></a>
                  </div>
                  <div className="service-overlay img-bg"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctor section */}
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


          <div className="d-flex flex-row overflow-auto gap-5 px-4 py-4" style={{ paddingBottom: '2rem', marginLeft: '12rem' }}>
            {doctors.map((doctor, index) => (
              <div
                className="card shadow-sm border-0 doctor-card"
                style={{
                  minWidth: '280px',
                  borderRadius: '16px',
                  transition: 'all 0.3s ease',
                  background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
                  marginRight: '1rem'
                }}
                key={index}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                }}
              >
                <div className="position-relative overflow-hidden" style={{ borderRadius: '16px 16px 0 0' }}>
                  <img
                    src={doctor_img}
                    className="card-img-top"
                    alt={doctor.fullName}
                    style={{
                      height: '220px',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  />
                  {/* Score Badge */}
                  <div
                    className="position-absolute top-0 end-0 m-3 badge"
                    style={{
                      backgroundColor: doctor.avarageScore >= 4.5 ? '#28a745' :
                        doctor.avarageScore >= 4.0 ? '#ffc107' : '#dc3545',
                      color: doctor.avarageScore >= 4.0 ? '#fff' : '#fff',
                      fontSize: '0.75rem',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontWeight: '600'
                    }}
                  >
                    ⭐ {doctor.avarageScore}
                  </div>
                </div>

                <div className="card-body text-center p-4">
                  <h5
                    className="card-title mb-2"
                    style={{
                      fontWeight: '700',
                      color: '#2c3e50',
                      fontSize: '1.1rem'
                    }}
                  >
                    {doctor.fullName}
                  </h5>

                  <p
                    className="card-text mb-3"
                    style={{
                      color: '#6c757d',
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}
                  >
                    {doctor.degree}
                  </p>

                  {/* Rating Stars */}
                  <div className="mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        style={{
                          color: i < Math.floor(doctor.avarageScore) ? '#ffc107' : '#e9ecef',
                          fontSize: '1rem'
                        }}
                      >
                        ★
                      </span>
                    ))}
                    <small className="text-muted ms-2">({doctor.avarageScore})</small>
                  </div>

                  <a
                    href={`/doctor-schedule/${doctor.doctorId}`}
                    className="btn btn-primary w-100"
                    style={{
                      backgroundColor: '#007bff',
                      borderColor: '#007bff',
                      borderRadius: '25px',
                      padding: '10px 20px',
                      fontWeight: '600',
                      fontSize: '0.9rem',
                      transition: 'all 0.3s ease',
                      textDecoration: 'none',
                      border: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#0056b3';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,123,255,0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#007bff';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    📅 Check Schedule
                  </a>
                </div>
              </div>
            ))}
          </div>
          {/* Optional Carousel Dots */}
          <div className="text-center mt-4">
            <span className="dot active"></span>
            <span className="dot"></span>
          </div>
        </div>
      </section>

      {/* Booking section */}
      <section id="appointment" className="service-section pt-150">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 mx-auto">
              <div className="section-title text-center mb-55">
                <span className="wow fadeInDown" data-wow-delay=".2s">Appointment</span>
                <h2 className="mb-15 wow fadeInUp" data-wow-delay=".4s">Get Appointment Now</h2>
                <p className="wow fadeInUp" data-wow-delay=".6s">
                  Booking your fertility consultation has never been easier. Our system allows patients to conveniently schedule appointments online, whether for initial consultations, follow-up visits, injections, or key procedures like IUI and IVF. Users can select their preferred doctor, choose a treatment service, and set the date and time that works best for them — all in just a few clicks.
                  To ensure seamless care, each booking is automatically integrated with your treatment timeline, and the system will send reminders for upcoming appointments, medication schedules, and test dates. Whether you're starting your fertility journey or continuing your treatment plan, our appointment booking helps you stay organized and in control.
                </p>
              </div>
            </div>
          </div>

          <form className="row g-3">
            <div className="col-md-6">
              <input type="text" className="form-control" placeholder="Name" />
            </div>
            <div className="col-md-6">
              <input type="email" className="form-control" placeholder="Email" />
            </div>

            <div className="col-md-6">
              <select className="form-control">
                <option value="">Select Doctor</option>
                <option value="Hamir">Dr. Hamir Jun.</option>
                <option value="Gideu">Dr. Gideu Ds.</option>
                <option value="Huduei">Dr. Huduei Chy.</option>
                <option value="Marke">Dr. Marke Ah.</option>
              </select>
            </div>
            <div className="col-md-6">
              <input type="date" className="form-control" placeholder="Appointment Date" />
            </div>

            <div className="col-md-6">
              <select className="form-control">
                <option value="">Select Service</option>
                <option value="cardiology">Cardiology</option>
                <option value="neurology">Neurology</option>
                <option value="gastroenterology">Gastroenterology</option>
                <option value="orthopedics">Orthopedics</option>
                <option value="gynecology">Gynecology</option>
              </select>
            </div>
            <div className="col-md-6">
              <input type="time" className="form-control" placeholder="Appointment Time" />
            </div>

            <div className="col-12">
              <textarea className="form-control" placeholder="Message" ></textarea>
            </div>

            <div className="col-12">
              <a
                href="#"
                className="btn theme-btn page-scroll"
                data-animation="fadeInUp"
                data-duration="1.5s"
                data-delay=".9s"
              >
                Booking Now
              </a>

            </div>
          </form>
        </div>
      </section>

    </div>
  );
};
export default Body;
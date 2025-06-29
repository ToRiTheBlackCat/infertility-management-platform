import React from 'react';


const Body = () => {
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
          {[
            { title: 'AAAA', iconPath: 'assets/icons/heart.svg' },
            { title: 'BBBB', iconPath: 'assets/icons/brain.svg' },
            { title: 'CCCC', iconPath: 'assets/icons/stomach.svg' },
            { title: 'DDDD', iconPath: 'assets/icons/knee.svg' },
            { title: 'EEEE', iconPath: 'assets/icons/womb.svg' },
            { title: 'FFFF', iconPath: 'assets/icons/aaaa.svg' }

          ].map((service, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <div className="service-item mb-30">
                <div className="service-icon mb-25">
                  <img src={service.iconPath} alt={`${service.title} icon`} />
                </div>
                <div className="service-content">
                  <h4>{service.title}</h4>
                  <p>Lorem ipsum dolor sit amet, consetet sadipscing elitr, sed dinonumy eirmod tempor invidunt.</p>
                  <a href="#" className="read-more">Read More <i className="lni lni-arrow-right"></i></a>
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

    <div className="row">
      {[
        {
          name: 'Dr: Hamir Jun.',
          specialty: 'Gastroenterology',
          img: 'assets/img/doctors/doc1.png',
          icon: 'assets/icons/stomach.svg'
        },
        {
          name: 'Dr: Gideu Ds.',
          specialty: 'Neurology',
          img: 'assets/img/doctors/doc2.png',
          icon: 'assets/icons/brain.svg'
        },
        {
          name: 'Dr: Huduei Chy.',
          specialty: 'Orthopedics',
          img: 'assets/img/doctors/doc3.png',
          icon: 'assets/icons/knee.svg'
        },
        {
          name: 'Dr: Marke Ah.',
          specialty: 'Gynecology',
          img: 'assets/img/doctors/doc4.png',
          icon: 'assets/icons/womb.svg'
        }
      ].map((doctor, index) => (
        <div className="col-lg-3 col-md-6" key={index}>
        <div className="service-item text-center mb-30">
            <div className="doctor-img mb-20">
            <img src={doctor.img} alt={doctor.name} className="img-fluid rounded" />
            </div>
            <div className="service-icon mb-15">
            <img src={doctor.icon} alt={`${doctor.specialty} icon`} />
            </div>
            <div className="service-content">
            <h5 className="mb-5">{doctor.name}</h5>
            <p className="text-muted">{doctor.specialty}</p>
            </div>
            <div className="service-overlay img-bg"></div> 
            <div className="col-12">
            <a
            href="#"
            className="btn theme-btn page-scroll"
            data-animation="fadeInUp"
            data-duration="1.5s"
            data-delay=".9s"
            >
            Check schedule
            </a>
        </div>
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
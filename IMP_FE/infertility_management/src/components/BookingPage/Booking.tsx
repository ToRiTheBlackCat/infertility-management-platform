import React, { useState } from 'react';
import backgroundImage from '../assets/img/bg/footer-bg.jpg'; // adjust path if needed
import IMP_logo from '../assets/img/logo/IMP_logo.jpg'; // also import the logo for consistency
import { Modal, Button } from 'react-bootstrap';

const doctor = {
  name: 'Dr. Hamir Jun.',
  specialty: 'Infertility Specialist',
  qualification: 'MD, Reproductive Endocrinology',
  experience: '15+ years',
  image: '/assets/img/doctors/doc1.png',
};

const schedule: { [date: string]: boolean } = {
  '2025-07-01': true,
  '2025-07-03': true,
  '2025-07-05': true,
  '2025-07-07': true,
  '2025-07-13': true,
  '2025-07-15': true,
  '2025-07-20': true,
  '2025-07-22': true,
  '2025-07-26': true,
};
const Booking = () => {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
  
    const today = new Date();
    const generateDates = () => {
      const dates = [];
      for (let i = 0; i < 30; i++) {
        const date = new Date();
        date.setDate(today.getDate() + i);
        const key = date.toISOString().split('T')[0]; // e.g., "2025-07-01"
        dates.push({
          key,
          available: schedule[key] || false, // fix: use `schedule` directly
        });
      }
      return dates;
    };
  
    const handleDateClick = (dateKey: string) => {
      setSelectedDate(dateKey);
      setShowModal(true);
    };


  return ( <section id="appointment" className="service-section pt-150">
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
            <input type="text" className="form-control" placeholder="Customer Name" />
        </div>
        <div className="col-md-6">
            <input type="email" className="form-control" placeholder="Email" />
        </div>
        <div className="col-md-6">
            <input type="text" className="form-control" placeholder="PhoneNumber" />
        </div>
        <div className="col-md-6">
            <input type="email" className="form-control" placeholder="Address" />
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
            <select className="form-control">
            <option value="">Select Service</option>
            <option value="cardiology">Cardiology</option>
            <option value="neurology">Neurology</option>
            <option value="gastroenterology">Gastroenterology</option>
            <option value="orthopedics">Orthopedics</option>
            <option value="gynecology">Gynecology</option>
            </select>
        </div>

        <div className="col-12">
            <textarea className="form-control" placeholder="Message" ></textarea>
        </div>

      {/* Doctor schedule */}
      <h4 className="mb-4">Doctor's Schedule</h4>
      <div className="row">
        {generateDates().map((dateObj, index) => (
          <div className="col-3 mb-3" key={index}>
            <div
              className={`p-3 border rounded text-center ${dateObj.available ? 'bg-success text-white' : 'bg-light text-muted'}`}
              style={{ cursor: dateObj.available ? 'pointer' : 'not-allowed' }}
              onClick={() => dateObj.available && handleDateClick(dateObj.key)}
            >
              {new Date(dateObj.key).toLocaleDateString('en-GB', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Booking button */}
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

    {/* PopUp confirm */}
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Book Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You selected <strong>{selectedDate && new Date(selectedDate).toLocaleDateString()}</strong> with <strong>{doctor.name}</strong>.</p>
          <p>Would you like to proceed to booking?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => {
            window.location.href = '/bookings';
          }}>
            Book This Day
          </Button>
        </Modal.Footer>
      </Modal>
    </section>);
};
export default Booking;
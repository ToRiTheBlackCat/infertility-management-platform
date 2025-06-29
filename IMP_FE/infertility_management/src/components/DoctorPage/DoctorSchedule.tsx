import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap'; // Ensure you have bootstrap installed

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
};

const DoctorSchedule = () => {
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

  return (
    <div className="container py-5">
      <div className="row align-items-center mb-5">
        <div className="col-md-4">
          <img src={doctor.image} alt={doctor.name} className="img-fluid rounded shadow" />
        </div>
        <div className="col-md-8">
          <h3>{doctor.name}</h3>
          <p><strong>Specialty:</strong> {doctor.specialty}</p>
          <p><strong>Qualification:</strong> {doctor.qualification}</p>
          <p><strong>Experience:</strong> {doctor.experience}</p>
        </div>
      </div>

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
    </div>
  );
};

export default DoctorSchedule;

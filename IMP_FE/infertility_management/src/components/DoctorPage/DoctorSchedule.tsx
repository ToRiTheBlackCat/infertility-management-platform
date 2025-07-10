import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap'; // Ensure you have bootstrap installed
import { fetchUserProfile, fetchDoctorSchedule } from '../../service/authService';
import { useParams } from 'react-router-dom';
import { DoctorData, DoctorScheduleData } from '../../types/common';
import doctor from '../../assets/img/doctor.jpg'; // Placeholder image, replace with actual doctor image path


const DoctorSchedule = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState<DoctorData | null>(null);
  const [schedule, setSchedule] = useState<DoctorScheduleData>();
  const { id } = useParams<string>();

  useEffect(() => {
    const doctorId = id ? parseInt(id) : 0;
    const fetchDortorInfo = async () => {
      try {
        const doctorData = await fetchUserProfile(doctorId, true);
        if (doctorData) {
          setDoctorInfo(doctorData);
        }
      } catch (error) {
        console.error('Error fetching doctor info:', error);
      }
    };
    const fetchSchedule = async () => {
      try {
        const scheduleData = await fetchDoctorSchedule(doctorId);
        if (scheduleData) {
          // Assuming scheduleData is an object with date keys and boolean values
          setSchedule(scheduleData);
        }
      } catch (error) {
        console.error('Error fetching doctor schedule:', error);
      }
    }
    fetchSchedule();
    fetchDortorInfo();
  }, [id, schedule])

  const today = new Date();
  const generateDates = () => {
    const dates = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);

      const weekday = date.getDay(); // 0 (Sun) to 6 (Sat)
      const key = date.toISOString().split('T')[0];

      let available = false;
      if (schedule) {
        switch (weekday) {
          case 0: available = schedule.sunday; break;
          case 1: available = schedule.monday; break;
          case 2: available = schedule.tuesday; break;
          case 3: available = schedule.wednesday; break;
          case 4: available = schedule.thursday; break;
          case 5: available = schedule.friday; break;
          case 6: available = schedule.saturday; break;
        }
      }

      dates.push({ key, available });
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
          <img src={doctor} alt={doctorInfo?.fullName} className="img-fluid rounded shadow" />
        </div>
        <div className="col-md-8">
          <h3>{doctorInfo?.fullName}</h3>
          <p><strong>Gender:</strong> {doctorInfo?.gender}</p>
          <p><strong>Qualification:</strong> {doctorInfo?.degree}</p>
          <p><strong>Phone number:</strong> {doctorInfo?.phoneNumber}</p>
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
          <p>You selected <strong>{selectedDate && new Date(selectedDate).toLocaleDateString()}</strong> with <strong>{doctorInfo?.fullName}</strong>.</p>
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

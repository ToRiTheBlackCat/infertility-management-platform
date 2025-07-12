import React, { useEffect, useState } from 'react';
import doctorImg from "../../assets/img/doctor.jpg"// also import the logo for consistency
import { fetchDoctor, fetchTreatment, createBookingTreatment } from '../../service/authService';
import { DoctorData, TreatmentData } from '../../types/common';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { toast } from 'react-toastify';

const Booking = () => {
  const [doctor, setDoctor] = useState<DoctorData[]>([])
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<TreatmentData[]>([]);
  const patientId = useSelector((state: RootState) => state.user.userId);
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<number | null>(null);

  useEffect(() => {
    const fetchDoctorInfoAndSchedules = async () => {
      try {
        // Gọi API để lấy danh sách doctor
        const doctorData = await fetchDoctor();
        if (doctorData && doctorData.length > 0) {
          setDoctor(doctorData);
        }
      } catch (error) {
        console.error('Error fetching doctor info or schedule:', error);
      }
    };
    const fetchTreatmentData = async () => {
      const treatmentData = await fetchTreatment();
      if (treatmentData) {
        setSelectedService(treatmentData); // Set default service to the first one
      }
    }
    fetchTreatmentData();
    fetchDoctorInfoAndSchedules();
  }, []);
  const handleBooking = async () => {
    if (!selectedDoctorId || !selectedTreatmentId) {
      alert("Please select a doctor and service.");
      return;
    }

    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    const bookingData = {
      patientId: Number(patientId),
      doctorId: selectedDoctorId,
      treatmentId: selectedTreatmentId,
      createdDate: formattedDate,
    };
    console.log(bookingData)

    const result = await createBookingTreatment(bookingData);
    if (result) {
      toast("Booking successful!");
      // bạn có thể chuyển trang hoặc reset form tại đây nếu muốn
    } else {
      toast.error("Booking failed. Please try again.");
    }
  };

  return (<section id="appointment" className="service-section pt-150">
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

        <div className='col-md-6'>
          <select
            value={selectedTreatmentId ?? ''}
            onChange={(e) => setSelectedTreatmentId(Number(e.target.value))}
            className="form-control">
            <option value="">Select Service</option>
            {selectedService.map((treatment) => (
              <option key={treatment.treatmentId} value={treatment.treatmentId}>
                {treatment.treatmentName}
              </option>
            ))}
          </select>
        </div>
        <h4 className="mb-3">Choose a Doctor</h4>
        <div className="d-flex overflow-auto gap-5 mb-4" style={{ marginLeft: '20rem', gap: '30px' }}>
          {doctor.map((doc) => (
            <div
              key={doc.doctorId}
              className={`card p-2 ${selectedDoctorId === doc.doctorId ? 'border-primary' : ''}`}
              style={{ minWidth: '200px', cursor: 'pointer' }}
              onClick={() => setSelectedDoctorId(doc.doctorId)}
            >
              <img
                src={doctorImg} // ✅ dùng ảnh cố định
                className="card-img-top rounded"
                alt={doc.fullName}
                style={{ height: '150px', objectFit: 'cover' }}
              />
              <div className="card-body text-center">
                <h6>{doc.fullName}</h6>
                <small>{doc.degree}</small>
              </div>
            </div>
          ))}
        </div>

        {/* Booking button */}
        <div className="col-12">
          <button
            type="button"
            className="btn theme-btn page-scroll"
            onClick={handleBooking}
            data-animation="fadeInUp"
            data-duration="1.5s"
            data-delay=".9s"
          >
            Booking Now
          </button>
        </div>
      </form>
    </div>

  </section>);
};
export default Booking;
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Header from './components/Utils/Header';
import './assets/css/bootstrap-5.0.5-alpha.min.css';
import './assets/css/LineIcons.2.0.css';
import './assets/css/animate.css';
import './assets/css/tiny-slider.css';
import './assets/css/main.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderComponent from './components/Utils/SliderComponent';
import Footer from './components/Utils/Footer';
import Body from './components/HomePage/Body';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Booking from './components/BookingPage/Booking';
import Doctor from './components/DoctorPage/Doctor';
import Blog from './components/BlogPage/Blog';
import Contact from './components/ContactPage/Contact';
import Treatment from './components/TreatmentPage/Treatment';
import TreatmentDetail from './components/TreatmentPage/TreatmentDetail';
import DoctorSchedule from './components/DoctorPage/DoctorSchedule';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Login from './components/Login/Login';
import BlogDetail from './components/BlogPage/BlogDetail';
import BookingAppointment from './pages/BookingAppointment';
import Profile from './pages/Profile';
import BookingAppointmentDetail from './pages/BookingAppointmentDetail';
import DoctorAppointment from './pages/DoctorAppointment';
import DoctorAppointmentDetail from './pages/DoctorAppointmentDetail';
import DoctorBlog from './pages/DoctorBlog';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ToastContainer } from 'react-toastify';






const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <>
  <ToastContainer/>
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Body />} />
            <Route path="/treatments" element={<Treatment />} />
            <Route path="/bookings" element={<Booking />} />
            <Route path="/doctors" element={<Doctor />} />
            <Route path="/blogs" element={<Blog />} />
            <Route path="/blog-detail" element={<BlogDetail />} />
            <Route path="/contacts" element={<Contact />} />
            <Route path="/treatment-detail/:id" element={<TreatmentDetail />} />
            <Route path="/doctor-schedule/:id" element={<DoctorSchedule />} />
            <Route path='/booking-appointment' element={<BookingAppointment/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/booking-detail/:bookingId' element={<BookingAppointmentDetail/>}/>
            <Route path='/doctor-appointment' element={<DoctorAppointment/>}/>
            <Route path='/doctor-appointment-detail/:bookingId' element={<DoctorAppointmentDetail/>}/>
            <Route path='/doctor-blog' element={<DoctorBlog/>}/>
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
  </>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

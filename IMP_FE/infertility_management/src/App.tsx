import React from 'react';
import './App.css';
import Header from './components/Utils/Header';
import {Outlet,Link} from "react-router-dom";
import Footer from './components/Utils/Footer';
import SliderComponent from './components/Utils/SliderComponent';
import ScrollToTop from './components/Utils/ScrollToTop ';
import { useTokenWatcher } from './hooks/useTokenWatcher';
function App() {
  useTokenWatcher();
  return (
    <div className="app-container">
      <ScrollToTop/>
      <div className="header-container">
        <Header/>
      </div>
      <div className="slider-container">
        <SliderComponent/>
      </div>
      <div className="main-container">
        <div className="app-content">
          <Outlet/>
        </div>
      </div>
      <div className="footer-container">
        <Footer/>
      </div>
    </div>
  );
}

export default App;

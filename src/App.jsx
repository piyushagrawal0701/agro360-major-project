import React, { useRef } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import WhyAgro360 from "./components/WhyAgro360";
import FertilizersInfo from "./Pages/FertilizerInfo";
import CropScheduler from "./Pages/CropScheduler";
import GovernmentSchemes from "./Pages/GovernmentSchemes";
import AgriBazaar from "./Pages/AgriBazaar";
import CropDoctor from "./Pages/CropDoctor";
import Footer from "./components/Footer"; 
import ScrollToTop from "./components/ScrollToTop";
import Ai from "./components/Ai";
import { Toaster } from "react-hot-toast";

export default function App() {
  const fertilizerRef = useRef();
  const cropRef = useRef();
  const marketRef = useRef();
  const schemeRef = useRef();
  const cropDoctorRef = useRef();

  return (
    <div className="bg-white text-gray-800 flex flex-col min-h-screen">
      <ScrollToTop/>
      <Ai/>
      <Toaster/>
      <Navbar
        scrollTo={{
          fertilizerRef,
          cropRef,
          marketRef,
          schemeRef,
          cropDoctorRef,
        }}
      />

      <div className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <section id="home">
                  <Home />
                </section>
                <section id="why-agro360">
                  <WhyAgro360 />
                </section>
              </>
            }
          />
          <Route path="/fertilizers" element={<FertilizersInfo />} />
          <Route path="/crop-scheduler" element={<CropScheduler />} />
          
          <Route path="/agri-bazaar" element={<AgriBazaar />} />
          <Route path="/schemes" element={<GovernmentSchemes />} />
          <Route path="/crop-doctor" element={<CropDoctor />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

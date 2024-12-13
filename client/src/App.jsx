import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInPage from './pages/Login';
import SignUpPage from './pages/Register';
import Home from './pages/Home';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
function App() {
 
  return (
    <Router>
      <div className="max-w-7xl flex items-center justify-center flex-col mx-auto">
        <Header />
        <div className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<SignInPage />} />
            <Route path="/register" element={<SignUpPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

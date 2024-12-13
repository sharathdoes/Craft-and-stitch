import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import Home from './pages/Home';
import Createcompany from './pages/createcompany';
import LottieLoader from './helpers/loader';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Simulates a loading period
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LottieLoader />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/company-reg" element={<Createcompany />} />
      </Routes>
    </Router>
  );
}

export default App;

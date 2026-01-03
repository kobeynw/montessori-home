import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Activities from './pages/Activities';
import Education from './pages/Education';
import Calendar from './pages/Calendar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/education" element={<Education />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/login" element={<Placeholder title="Login" />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

// Temporary placeholder component
const Placeholder = ({ title }) => (
  <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
    <h1>{title}</h1>
    <p>This page is coming soon...</p>
  </div>
);

export default App;
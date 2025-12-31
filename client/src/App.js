import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className='App-header'>
          <h1>Montessori Home</h1>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/education" element={<Education />} />
            <Route path="/calendar" element={<Calendar />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// Temporary placeholder components
const Home = () => <div><h2>Home</h2><p>Welcome to Montessori Home!</p></div>;
const Activities = () => <div><h2>Activities</h2><p>Activity repository coming soon...</p></div>;
const Education = () => <div><h2>Education</h2><p>Educational content coming soon...</p></div>;
const Calendar = () => <div><h2>Calendar</h2><p>Weekly planner coming soon...</p></div>;

export default App;
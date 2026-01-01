import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Montessori Home</h1>
          <p className="hero-subtitle">
            Create a nurturing learning environment for your child in your own home with curated Montessori activities, 
            educational resources, and personalized planning tools.
          </p>
          <div className="hero-buttons">
            <a href="/activities" className="btn btn-primary">
              Explore Activities
            </a>
            <a href="/education" className="btn btn-secondary">
              Learn About Montessori
            </a>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="features-container">
          <h2>Everything You Need to Get Started</h2>
          
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>Activity Library</h3>
              <p>
                Browse hundreds of Montessori-inspired activities organized 
                by age, category, and learning area. Each activity includes 
                detailed instructions and materials lists.
              </p>
              <a href="/activities" className="feature-link">Browse Activities →</a>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎓</div>
              <h3>Educational Resources</h3>
              <p>
                Learn the principles and practices of Montessori education. 
                Discover how to create a prepared environment and follow 
                your child's developmental needs.
              </p>
              <a href="/education" className="feature-link">Start Learning →</a>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3>Weekly Planning</h3>
              <p>
                Plan your week with an easy-to-use calendar. Schedule 
                activities, track progress, and build consistent learning 
                routines with your child.
              </p>
              <a href="/calendar" className="feature-link">Plan Your Week →</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
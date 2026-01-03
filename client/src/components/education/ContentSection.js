import React from 'react';
import './ContentSection.css';

const ContentSection = ({ section }) => {
  return (
    <section id={section.id} className="content-section">
      <div className="section-header">
        <span className="section-icon">{section.icon}</span>
        <h2>{section.title}</h2>
      </div>

      {section.subsections.map((subsection, index) => (
        <div key={index} className="subsection">
          <h3>{subsection.heading}</h3>
          <p>{subsection.content}</p>
        </div>
      ))}

      {section.tips && section.tips.length > 0 && (
        <div className="tips-box">
          <h4>💡 Quick Tips</h4>
          <ul>
            {section.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default ContentSection;
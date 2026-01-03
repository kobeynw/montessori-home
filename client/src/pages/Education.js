import React from 'react';
import { Link } from 'react-router-dom';
import educationContent from '../data/educationContent';
import TableOfContents from '../components/education/TableOfContents';
import ContentSection from '../components/education/ContentSection';
import BackToTop from '../components/education/BackToTop';
import './Education.css';

const Education = () => {
  return (
    <div className="education-page">
      <div className="education-container">
        <aside className="education-sidebar">
          <TableOfContents sections={educationContent.sections} />
        </aside>

        <main className="education-content">
          <div className="education-header">
            <h1>{educationContent.introduction.title}</h1>
            <p>{educationContent.introduction.content}</p>
          </div>
          
          {educationContent.sections.map(section => (
            <ContentSection key={section.id} section={section} />
          ))}

          <div className="education-conclusion">
            <h2>{educationContent.conclusion.title}</h2>
            <p>{educationContent.conclusion.content}</p>
            <div className="conclusion-cta">
              <p>{educationContent.conclusion.callToAction.text}</p>
              <Link 
                to={educationContent.conclusion.callToAction.buttonLink}
                className="btn btn-primary"
              >
                {educationContent.conclusion.callToAction.buttonText}
              </Link>
            </div>
          </div>
        </main>
      </div>

      <BackToTop />
    </div>
  );
};

export default Education;
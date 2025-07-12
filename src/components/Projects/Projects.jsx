import React from 'react';
import { projects } from '../../data/projects';

const Projects = () => {
  return (
    <section id="projects">
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            {project.imageUrl && <img src={project.imageUrl} alt={project.title} />}
            {project.projectUrl && <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">View Project</a>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;

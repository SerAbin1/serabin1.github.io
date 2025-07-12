import React from 'react';
import Slider from 'react-slick';
import { projects } from '../../data/projects';

const Projects = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <section id="projects">
      <h2>Projects</h2>
      <Slider {...settings}>
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            {project.imageUrl && <img src={project.imageUrl} alt={project.title} />}
            {project.projectUrl && <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">View Project</a>}
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Projects;
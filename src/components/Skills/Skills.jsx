import React from 'react';
import { skills } from '../../data/skills';

const Skills = () => {
  return (
    <section id="skills">
      <h2>Skills</h2>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div key={index} className="skill-item">
            {skill.icon && <img src={skill.icon} alt={skill.name} />}
            <h3>{skill.name}</h3>
            {skill.url && <a href={skill.url} target="_blank" rel="noopener noreferrer">Learn More</a>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;

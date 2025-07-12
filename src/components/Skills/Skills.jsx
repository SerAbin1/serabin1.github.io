import React from 'react';
import { skills } from '../../data/skills';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';

const Skills = () => {
  const getIconComponent = (iconName) => {
    const FaIcon = FaIcons[iconName];
    const SiIcon = SiIcons[iconName];
    if (FaIcon) return <FaIcon size={50} color="#00ff00" />;
    if (SiIcon) return <SiIcon size={50} color="#00ff00" />;
    return null;
  };

  return (
    <section id="skills">
      <h2>Skills</h2>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <a href={skill.url} target="_blank" rel="noopener noreferrer" key={index} className="skill-item">
            {getIconComponent(skill.icon)}
            <h3>{skill.name}</h3>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Skills;
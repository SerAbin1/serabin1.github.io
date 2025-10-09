// src/data/certifications.ts

export type Certification = {
  name: string;
  issuer: string;
  skills: string[];
  link: string;
};

/**
 * To add a new certification, simply add a new object to this array with:
 * - name: The certification name
 * - issuer: The organization that issued it
 * - skills: Array of relevant skills gained
 */
export const certifications: Certification[] = [
  {
    name: "Back End Development and APIs",
    issuer: "freeCodeCamp",
    skills: ["Node.js", "MongoDB"],
    link: "https://freecodecamp.org/certification/Abin_Biju/back-end-development-and-apis",
  },
  {
    name: "Ethical Hacking",
    issuer: "NPTEL",
    skills: ["Computer Networks", "Cryptography"],
    link: "https://nptel.ac.in/noc/E_Certificate/NPTEL24CS94S45740068203895139",
  },
  {
    name: "Google Cybersecurity Specialization",
    issuer: "Google",
    skills: ["Linux", "InfoSec"],
    link: "https://www.coursera.org/account/accomplishments/specialization/HM1CMX9R5D0F",
  },
  {
    name: "Containers & Kubernetes Essentials",
    issuer: "IBM",
    skills: ["Kubernetes", "Docker"],
    link: "https://www.credly.com/badges/c27b73b1-c11d-47c1-9895-c82b96641310/linked_in_profile",
  },
  {
    name: "Full Stack Web Development",
    issuer: "University of Helsinki",
    skills: ["API Development", "Express.js", "React.js"],
    link: "https://studies.cs.helsinki.fi/stats/api/certificate/fullstackopen/en/5c0fb5bca9c68aeaa585dae662cdf6ad",
  },
  {
    name: "Pandas",
    issuer: "Kaggle",
    skills: ["Data Analysis", "Python"],
    link: "https://www.kaggle.com/learn/certification/abinbiju1/pandas",
  },
  // Add more certifications here
];

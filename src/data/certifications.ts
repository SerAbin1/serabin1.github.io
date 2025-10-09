// src/data/certifications.ts

export type Certification = {
  name: string
  issuer: string
  skills: string[]
}

/**
 * To add a new certification, simply add a new object to this array with:
 * - name: The certification name
 * - issuer: The organization that issued it
 * - skills: Array of relevant skills gained
 */
export const certifications: Certification[] = [
  {
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    skills: ["Cloud Architecture", "AWS Services", "Security Best Practices"]
  },
  {
    name: "React Developer Certification",
    issuer: "Meta",
    skills: ["React", "TypeScript", "Component Design"]
  },
  // Add more certifications here
]

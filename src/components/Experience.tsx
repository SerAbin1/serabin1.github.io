import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Experience = () => {
  const experiences = [
    {
      title: "Backend Developer",
      company: "Evide.AI",
      period: "Present",
      location: "Remote",
      description: [
        "Building backend infrastructure for a bus tracking application",
        "Developing scalable APIs for real-time bus location data and route information",
        "Implementing efficient data processing systems for live tracking",
        "Designing robust database architecture for user and route management"
      ],
      technologies: ["Node.js", "Express.js", "PostgreSQL", "Docker", "Real-time APIs"]
    },
    {
      title: "Backend Developer Intern",
      company: "IndusTech Automations",
      period: "March - July 2025",
      location: "Madurai",
      description: [
        "Engineered a full-stack business management platform, streamlining invoicing and analytics",
        "Led backend development, building REST APIs for dynamic invoice generation",
        "Implemented secure Role Based Access Control (RBAC) and authentication systems",
        "Collaborated on React.js frontend and dashboard to visualize key business metrics"
      ],
      technologies: ["Node.js", "Express.js", "React.js", "PostgreSQL", "RBAC", "JWT"]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-gradient-terminal">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="code-comment text-lg mb-4">
            <span className="terminal-text">~$</span> cat experience.log
          </div>
          <h2 className="text-3xl md:text-4xl font-bold terminal-glow mb-4">
            Professional Experience
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Building scalable solutions and securing digital infrastructure
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border hover:shadow-card transition-all duration-300">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <CardTitle className="terminal-text text-xl">
                        {exp.title}
                      </CardTitle>
                      <CardDescription className="text-lg font-medium text-foreground">
                        {exp.company} • {exp.location}
                      </CardDescription>
                    </div>
                    <div className="text-sm code-comment font-mono">
                      {exp.period}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground">
                        <span className="terminal-text mt-1">▸</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="pt-4 border-t border-border">
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs bg-accent text-accent-foreground rounded-full font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
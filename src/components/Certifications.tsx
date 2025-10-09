import { useState } from "react"
import { certifications } from "@/data/certifications"
import { Button } from "@/components/ui/button"
import { Award, ChevronDown, ChevronUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const Certifications = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="w-full">
      <div className="flex justify-center">
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Award className="h-4 w-4" />
          {isOpen ? "Hide" : "View"} Certifications
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>

      {isOpen && (
        <div className="mt-8 animate-accordion-down">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold">Certifications</h3>
            <p className="text-muted-foreground">Professional certifications and credentials</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow bg-card"
              >
                <h4 className="font-bold text-lg mb-1"><a href={cert.link} target="_blank" rel="noopener noreferrer">{cert.name}</a></h4>
                <p className="text-sm text-muted-foreground mb-4">{cert.issuer}</p>
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Certifications


import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Baking Soda Volcano",
      difficulty: "Easy",
      timeNeeded: "30 minutes",
      materials: [
        "Empty plastic bottle",
        "Baking dish or tray",
        "Baking soda",
        "Vinegar",
        "Dishwashing soap",
        "Food coloring (red or orange)",
        "Cardboard or clay (optional, for building the volcano shape)"
      ],
      instructions: [
        "Place the empty bottle in the center of the baking dish or tray.",
        "If using cardboard or clay, shape it around the bottle to create a volcano shape, leaving the bottle opening clear.",
        "Add 2 tablespoons of baking soda into the bottle.",
        "Add a few drops of dish soap and food coloring.",
        "When ready for the eruption, pour vinegar into the bottle and step back!",
        "Watch as the chemical reaction creates a colorful explosion of foam!"
      ],
      scientific: "When baking soda (a base) mixes with vinegar (an acid), they create a chemical reaction that produces carbon dioxide gas. The gas bubbles, combined with the dish soap, create the foamy eruption!"
    },
    {
      title: "Homemade Bird Feeder",
      difficulty: "Easy",
      timeNeeded: "45 minutes (plus drying time)",
      materials: [
        "Pine cone",
        "Peanut butter",
        "Bird seed",
        "String or yarn",
        "Paper plate",
        "Scissors"
      ],
      instructions: [
        "Tie a string around the top of the pine cone for hanging.",
        "Spread peanut butter all over the pine cone using a butter knife.",
        "Pour bird seed onto a paper plate.",
        "Roll the sticky pine cone in the bird seed until completely covered.",
        "Hang your bird feeder from a tree branch outside your window.",
        "Watch as birds come to enjoy your creation!"
      ],
      scientific: "This project helps you learn about local bird species and their feeding habits. You can keep a journal of the different birds that visit your feeder!"
    },
    {
      title: "Lava Lamp in a Bottle",
      difficulty: "Medium",
      timeNeeded: "20 minutes",
      materials: [
        "Clear plastic bottle or jar",
        "Vegetable oil",
        "Water",
        "Food coloring",
        "Alka-Seltzer tablets or effervescent vitamin tablets"
      ],
      instructions: [
        "Fill the bottle about 1/4 with water.",
        "Add several drops of food coloring to the water.",
        "Slowly pour vegetable oil into the bottle until it's nearly full.",
        "Wait for the oil and water to separate completely.",
        "Break an Alka-Seltzer tablet into small pieces.",
        "Drop the pieces into the bottle one at a time and watch the colorful bubbles form!"
      ],
      scientific: "Oil and water don't mix because they have different densities. The water is heavier, so it stays at the bottom. When you add the tablet, it creates a chemical reaction that produces carbon dioxide gas bubbles. These bubbles attach to the colored water and carry it up through the oil. When the bubbles reach the surface and pop, the colored water falls back down!"
    }
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-kidz-background">
      <DashboardSidebar />
      
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
        <div className="kidz-container">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">DIY Projects</h1>
            <p className="text-gray-600">Fun hands-on projects and experiments!</p>
          </header>

          <div className="grid gap-8">
            {projects.map((project, index) => (
              <div key={index} className="kidz-card border-kidz-primary">
                <div className="flex items-center mb-4">
                  <div className="bg-kidz-light p-3 rounded-full">
                    <Award className="h-6 w-6 text-kidz-dark" />
                  </div>
                  <h3 className="text-xl font-bold ml-3">{project.title}</h3>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="font-bold text-kidz-dark">Difficulty</p>
                    <p>{project.difficulty}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="font-bold text-kidz-dark">Time Needed</p>
                    <p>{project.timeNeeded}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="font-bold text-kidz-dark">Supervision</p>
                    <p>Adult recommended</p>
                  </div>
                </div>
                
                <div className="bg-kidz-light/50 rounded-lg p-4 mb-4 border border-kidz-light">
                  <h4 className="font-bold text-lg mb-2">Materials You'll Need:</h4>
                  <ul className="list-disc pl-5 mb-6">
                    {project.materials.map((item, i) => (
                      <li key={i} className="mb-1">{item}</li>
                    ))}
                  </ul>
                  
                  <h4 className="font-bold text-lg mb-2">Instructions:</h4>
                  <ol className="list-decimal pl-5 mb-6">
                    {project.instructions.map((step, i) => (
                      <li key={i} className="mb-2">{step}</li>
                    ))}
                  </ol>
                  
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-bold text-lg mb-2">The Science Behind It:</h4>
                    <p>{project.scientific}</p>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-kidz-primary hover:bg-kidz-dark"
                  onClick={() => window.print()}
                >
                  Print Instructions
                </Button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Projects;

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import DrawingCanvas from "@/components/Canvas/DrawingCanvas";

const DrawingPrompts = () => {
  const { toast } = useToast();
  const [currentPrompt, setCurrentPrompt] = useState("Can you draw a dragon that lives in a forest made of candy?");
  
  const drawingPrompts = [
    "Draw a friendly alien having a picnic on the moon.",
    "Create a superhero whose power is controlling the weather.",
    "Draw your favorite animal wearing fancy clothes.",
    "Imagine and draw a new type of fruit that combines two existing fruits.",
    "Draw a magical treehouse where you'd like to live.",
    "Create a scene of underwater creatures having a party.",
    "Draw a robot that helps people with a specific job.",
    "Design a new vehicle that can travel on land, water, and in the air.",
    "Draw a monster that is actually very friendly and misunderstood.",
    "Create a map of an imaginary island with hidden treasure."
  ];

  const generateNewPrompt = () => {
    const randomIndex = Math.floor(Math.random() * drawingPrompts.length);
    setCurrentPrompt(drawingPrompts[randomIndex]);
    toast({
      title: "New drawing idea generated! 🎨",
      description: "Try drawing this new creation!",
    });
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-kidz-background">
      <DashboardSidebar />
      
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
        <div className="kidz-container">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Drawing Prompts</h1>
            <p className="text-gray-600">Get creative with these fun drawing ideas!</p>
          </header>

          <div className="kidz-card border-kidz-secondary max-w-3xl mx-auto">
            <div className="flex items-center mb-4">
              <div className="bg-kidz-light p-3 rounded-full">
                <Pencil className="h-6 w-6 text-kidz-dark" />
              </div>
              <h3 className="text-xl font-bold ml-3">Your Drawing Challenge</h3>
            </div>
            
            <div className="bg-kidz-light/50 rounded-lg p-6 mb-6 border border-kidz-light">
              <p className="text-2xl font-medium text-center">{currentPrompt}</p>
            </div>
            
            <div className="text-center mb-8">
              <Button 
                onClick={generateNewPrompt}
                className="px-8 py-6 text-lg bg-kidz-secondary hover:bg-kidz-accent"
              >
                Generate New Drawing Idea
              </Button>
            </div>

            <DrawingCanvas />
            
            <div className="mt-8 bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-bold mb-2">Drawing Tips:</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Start with basic shapes and add details later</li>
                <li>Don't worry about making mistakes - they can become part of your art!</li>
                <li>Use the eraser tool to fix any mistakes</li>
                <li>Click "Guess My Drawing" when you're done to see if AI can recognize it!</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DrawingPrompts;

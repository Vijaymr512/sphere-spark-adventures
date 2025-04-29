
import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Moon, Star, MapPin, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const characters = [
  "Dragon", "Princess", "Pirate", "Unicorn", "Robot", 
  "Dinosaur", "Fairy", "Astronaut", "Mermaid", "Superhero"
];

const places = [
  "Castle", "Moon", "Ocean", "Jungle", "Space Station", 
  "Underwater City", "Mountain", "Cloud Kingdom", "Desert Island", "Magical Forest"
];

const objects = [
  "Magic Wand", "Treasure Map", "Ice Cream", "Flying Carpet", 
  "Talking Book", "Time Machine", "Magic Seeds", "Crystal Ball", 
  "Rainbow Potion", "Glowing Lantern"
];

const BedtimeStories = () => {
  const { toast } = useToast();
  const [selectedCharacter, setSelectedCharacter] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");
  const [selectedObject, setSelectedObject] = useState("");
  const [customCharacter, setCustomCharacter] = useState("");
  const [customPlace, setCustomPlace] = useState("");
  const [customObject, setCustomObject] = useState("");
  const [generatedStory, setGeneratedStory] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleCharacterSelect = (character: string) => {
    setSelectedCharacter(character === selectedCharacter ? "" : character);
    // Clear custom input if a predefined option is selected
    if (character !== selectedCharacter) {
      setCustomCharacter("");
    }
  };

  const handlePlaceSelect = (place: string) => {
    setSelectedPlace(place === selectedPlace ? "" : place);
    // Clear custom input if a predefined option is selected
    if (place !== selectedPlace) {
      setCustomPlace("");
    }
  };

  const handleObjectSelect = (object: string) => {
    setSelectedObject(object === selectedObject ? "" : object);
    // Clear custom input if a predefined option is selected
    if (object !== selectedObject) {
      setCustomObject("");
    }
  };

  const generateStory = () => {
    const finalCharacter = customCharacter || selectedCharacter;
    const finalPlace = customPlace || selectedPlace;
    const finalObject = customObject || selectedObject;
    
    // Validate all inputs are provided
    if (!finalCharacter || !finalPlace || !finalObject) {
      toast({
        title: "Missing Elements",
        description: "Please select or enter all three story elements!",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    // Simulate AI story generation
    setTimeout(() => {
      const story = generateBedtimeStory(finalCharacter, finalPlace, finalObject);
      setGeneratedStory(story);
      setIsGenerating(false);
      
      // Log this activity (replace with backend integration later)
      const timestamp = new Date().toISOString();
      const activity = {
        type: "bedtime_story",
        timestamp,
        elements: {
          character: finalCharacter,
          place: finalPlace,
          object: finalObject
        }
      };
      
      // Store activity (temporary localStorage solution)
      const activities = JSON.parse(localStorage.getItem("userActivities") || "[]");
      activities.push(activity);
      localStorage.setItem("userActivities", JSON.stringify(activities));
      
      toast({
        title: "Story Created!",
        description: "Your custom bedtime story is ready to read.",
      });
    }, 2000);
  };
  
  // Simple story generation function (replace with more sophisticated AI when integrated with backend)
  const generateBedtimeStory = (character: string, place: string, object: string) => {
    return `
    # The Adventures of the ${character}
    
    Once upon a time, in a beautiful ${place}, there lived a friendly ${character}. Everyone in the ${place} knew about the ${character}'s kindness and helpful nature.
    
    One day, while exploring a hidden corner of the ${place}, the ${character} found a mysterious ${object}. It was unlike anything the ${character} had ever seen before! The ${object} sparkled with magical energy, casting soft, colorful lights all around.
    
    "I wonder what this ${object} can do," the ${character} thought, carefully picking it up.
    
    As soon as the ${character} touched the ${object}, it began to glow even brighter. Suddenly, the ${object} whispered, "I have been waiting for someone like you, who has a pure heart and brave spirit."
    
    The ${object} explained that it had special powers that could help solve a problem in the ${place}. You see, lately the ${place} had been experiencing very dark nights, making it difficult for everyone to sleep peacefully.
    
    With the help of the magical ${object}, the ${character} traveled all around the ${place}, bringing soft, soothing light to every home. Each night, the ${character} would use the ${object} to create twinkling stars that would float above sleeping children, giving them wonderful dreams.
    
    The people of the ${place} were so grateful to the ${character} and the magical ${object}. From that night on, everyone in the ${place} had the most peaceful and restful sleep they had ever experienced.
    
    And every night, just before bedtime, the ${character} would come to visit, bringing the magical ${object} to create sweet dreams for all the boys and girls.
    
    The End.
    
    Sleep tight and have sweet dreams!
    `;
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-kidz-background">
      <DashboardSidebar />
      
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
        <div className="kidz-container">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Bedtime Story Mixer</h1>
            <p className="text-gray-600">Mix 3 elements to create a magical bedtime story!</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="kidz-card border-kidz-primary">
              <div className="flex items-center mb-6">
                <div className="bg-kidz-light p-3 rounded-full">
                  <Moon className="h-6 w-6 text-kidz-dark" />
                </div>
                <h3 className="text-xl font-bold ml-3">Create Your Story</h3>
              </div>
              
              {/* Story Elements Selection */}
              <div className="space-y-6">
                {/* Character Selection */}
                <div>
                  <Label className="text-lg font-semibold mb-2 block">1. Choose a Character</Label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {characters.map(character => (
                      <Button
                        key={character}
                        variant={selectedCharacter === character ? "default" : "outline"}
                        onClick={() => handleCharacterSelect(character)}
                        className="mb-2"
                      >
                        {character}
                      </Button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Or type your own character..."
                      value={customCharacter}
                      onChange={(e) => {
                        setCustomCharacter(e.target.value);
                        setSelectedCharacter("");
                      }}
                    />
                  </div>
                </div>
                
                {/* Place Selection */}
                <div>
                  <Label className="text-lg font-semibold mb-2 block">2. Choose a Place</Label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {places.map(place => (
                      <Button
                        key={place}
                        variant={selectedPlace === place ? "default" : "outline"}
                        onClick={() => handlePlaceSelect(place)}
                        className="mb-2"
                      >
                        <MapPin className="h-4 w-4 mr-1" />
                        {place}
                      </Button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Or type your own place..."
                      value={customPlace}
                      onChange={(e) => {
                        setCustomPlace(e.target.value);
                        setSelectedPlace("");
                      }}
                    />
                  </div>
                </div>
                
                {/* Object Selection */}
                <div>
                  <Label className="text-lg font-semibold mb-2 block">3. Choose an Object</Label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {objects.map(object => (
                      <Button
                        key={object}
                        variant={selectedObject === object ? "default" : "outline"}
                        onClick={() => handleObjectSelect(object)}
                        className="mb-2"
                      >
                        <Star className="h-4 w-4 mr-1" />
                        {object}
                      </Button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Or type your own object..."
                      value={customObject}
                      onChange={(e) => {
                        setCustomObject(e.target.value);
                        setSelectedObject("");
                      }}
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={generateStory} 
                  disabled={isGenerating}
                  className="w-full mt-4 bg-kidz-primary hover:bg-kidz-dark"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="animate-spin mr-2 h-4 w-4" />
                      Creating Your Story...
                    </>
                  ) : (
                    "Generate Bedtime Story"
                  )}
                </Button>
              </div>
            </div>
            
            {/* Story Display Area */}
            <div className="kidz-card border-kidz-secondary">
              <div className="flex items-center mb-4">
                <div className="bg-kidz-light p-3 rounded-full">
                  <BookOpen className="h-6 w-6 text-kidz-dark" />
                </div>
                <h3 className="text-xl font-bold ml-3">Your Bedtime Story</h3>
              </div>
              
              <div className="bg-kidz-light/30 rounded-lg p-6 prose max-w-none min-h-[400px] overflow-y-auto">
                {isGenerating ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="flex justify-center mb-4">
                        <Sparkles className="animate-spin h-8 w-8 text-kidz-primary" />
                      </div>
                      <p className="text-lg">Creating your magical story...</p>
                    </div>
                  </div>
                ) : generatedStory ? (
                  <div className="whitespace-pre-wrap">{generatedStory}</div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center text-gray-500">
                      <Star className="mx-auto h-12 w-12 mb-4 text-kidz-secondary/50" />
                      <p className="text-lg">Your story will appear here</p>
                      <p className="text-sm mt-2">Choose your elements and click "Generate Bedtime Story"</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BedtimeStories;

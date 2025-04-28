
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

const EarlyLearning = () => {
  const { toast } = useToast();
  const [currentSection, setCurrentSection] = useState("alphabet");
  const [currentLetter, setCurrentLetter] = useState("A");
  const [currentNumber, setCurrentNumber] = useState(1);
  
  const alphabetItems = {
    "A": { word: "Apple", activity: "Can you draw an apple?" },
    "B": { word: "Butterfly", activity: "Can you flap your arms like butterfly wings?" },
    "C": { word: "Cat", activity: "Can you purr and meow like a cat?" },
    "D": { word: "Dog", activity: "Can you bark like a dog?" },
    "E": { word: "Elephant", activity: "Can you swing your arm like an elephant's trunk?" },
    "F": { word: "Fish", activity: "Can you pretend to swim like a fish?" },
    "G": { word: "Giraffe", activity: "Can you stretch your neck tall like a giraffe?" },
    "H": { word: "House", activity: "Can you draw a house?" },
    "I": { word: "Ice Cream", activity: "Can you pretend to lick an ice cream cone?" },
    "J": { word: "Jump", activity: "Can you jump up and down five times?" },
    "K": { word: "Kite", activity: "Can you pretend to fly a kite?" },
    "L": { word: "Lion", activity: "Can you roar like a lion?" },
    "M": { word: "Moon", activity: "Can you draw a crescent moon?" },
    "N": { word: "Nest", activity: "Can you use your hands to show a bird's nest?" },
    "O": { word: "Octopus", activity: "Can you wiggle like an octopus has 8 arms?" },
    "P": { word: "Penguin", activity: "Can you waddle like a penguin?" },
    "Q": { word: "Queen", activity: "Can you pretend to wear a crown and wave?" },
    "R": { word: "Rainbow", activity: "Can you name the colors of the rainbow?" },
    "S": { word: "Snake", activity: "Can you slither like a snake?" },
    "T": { word: "Tiger", activity: "Can you prowl like a tiger?" },
    "U": { word: "Umbrella", activity: "Can you pretend to open an umbrella?" },
    "V": { word: "Volcano", activity: "Can you pretend to erupt like a volcano?" },
    "W": { word: "Whale", activity: "Can you make a big splash like a whale?" },
    "X": { word: "X-ray", activity: "Can you see through things with pretend x-ray vision?" },
    "Y": { word: "Yo-yo", activity: "Can you pretend to play with a yo-yo?" },
    "Z": { word: "Zebra", activity: "Can you gallop like a zebra?" }
  };
  
  const numberItems = {
    1: { activity: "Can you find 1 toy in your room?", funFact: "1 is the first odd number." },
    2: { activity: "Can you point to 2 of your body parts?", funFact: "We have 2 eyes, 2 ears, 2 hands, and 2 feet!" },
    3: { activity: "Can you jump 3 times?", funFact: "There are 3 primary colors: red, blue, and yellow." },
    4: { activity: "Can you clap 4 times?", funFact: "A car has 4 wheels, and a chair has 4 legs." },
    5: { activity: "Can you show 5 fingers?", funFact: "We have 5 fingers on each hand and 5 toes on each foot." },
    6: { activity: "Can you touch your toes 6 times?", funFact: "An insect has 6 legs." },
    7: { activity: "Can you name 7 animals?", funFact: "There are 7 days in a week." },
    8: { activity: "Can you spell your name 8 times?", funFact: "An octopus has 8 tentacles." },
    9: { activity: "Can you spin around 9 times?", funFact: "A cat has 9 lives (according to a popular saying)." },
    10: { activity: "Can you count to 10 backwards?", funFact: "We have 10 fingers and 10 toes in total." }
  };

  const nextLetter = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const currentIndex = alphabet.indexOf(currentLetter);
    const nextIndex = (currentIndex + 1) % alphabet.length;
    setCurrentLetter(alphabet[nextIndex]);
    toast({
      title: "New letter loaded!",
      description: `Let's learn about the letter ${alphabet[nextIndex]}.`,
    });
  };

  const prevLetter = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const currentIndex = alphabet.indexOf(currentLetter);
    const prevIndex = (currentIndex - 1 + alphabet.length) % alphabet.length;
    setCurrentLetter(alphabet[prevIndex]);
  };

  const nextNumber = () => {
    const next = (currentNumber % 10) + 1;
    setCurrentNumber(next);
    toast({
      title: "New number loaded!",
      description: `Let's learn about the number ${next}.`,
    });
  };

  const prevNumber = () => {
    const prev = currentNumber === 1 ? 10 : currentNumber - 1;
    setCurrentNumber(prev);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-kidz-background">
      <DashboardSidebar />
      
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
        <div className="kidz-container">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">ABC & 123</h1>
            <p className="text-gray-600">Learning letters and numbers is fun!</p>
          </header>

          <div className="flex flex-wrap gap-4 mb-8">
            <Button 
              onClick={() => setCurrentSection("alphabet")}
              variant={currentSection === "alphabet" ? "default" : "outline"}
              className={currentSection === "alphabet" ? "bg-kidz-primary" : ""}
            >
              Alphabet Fun
            </Button>
            <Button 
              onClick={() => setCurrentSection("numbers")}
              variant={currentSection === "numbers" ? "default" : "outline"}
              className={currentSection === "numbers" ? "bg-kidz-primary" : ""}
            >
              Number Fun
            </Button>
          </div>

          {currentSection === "alphabet" && (
            <div className="kidz-card border-kidz-secondary max-w-3xl mx-auto">
              <div className="flex items-center mb-4">
                <div className="bg-kidz-light p-3 rounded-full">
                  <Edit className="h-6 w-6 text-kidz-dark" />
                </div>
                <h3 className="text-xl font-bold ml-3">Alphabet Adventures</h3>
              </div>
              
              <div className="bg-kidz-light/50 rounded-lg p-6 mb-6 border border-kidz-light text-center">
                <div className="text-9xl font-bold text-kidz-primary mb-4">{currentLetter}</div>
                
                <p className="text-2xl mb-6 font-medium">
                  <span className="font-bold">{currentLetter}</span> is for <span className="font-bold text-kidz-primary">{alphabetItems[currentLetter as keyof typeof alphabetItems].word}</span>
                </p>
                
                <div className="bg-white p-4 rounded-lg mb-6">
                  <p className="text-xl">Activity: {alphabetItems[currentLetter as keyof typeof alphabetItems].activity}</p>
                </div>
                
                <div className="flex justify-center gap-4">
                  <Button 
                    onClick={prevLetter}
                    variant="outline"
                    className="border-kidz-primary hover:bg-kidz-light px-8"
                  >
                    Previous Letter
                  </Button>
                  <Button 
                    onClick={nextLetter}
                    className="bg-kidz-primary hover:bg-kidz-dark px-8"
                  >
                    Next Letter
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {currentSection === "numbers" && (
            <div className="kidz-card border-kidz-secondary max-w-3xl mx-auto">
              <div className="flex items-center mb-4">
                <div className="bg-kidz-light p-3 rounded-full">
                  <Edit className="h-6 w-6 text-kidz-dark" />
                </div>
                <h3 className="text-xl font-bold ml-3">Number Fun</h3>
              </div>
              
              <div className="bg-kidz-light/50 rounded-lg p-6 mb-6 border border-kidz-light text-center">
                <div className="text-9xl font-bold text-kidz-primary mb-4">{currentNumber}</div>
                
                <div className="flex justify-center mb-6">
                  {[...Array(currentNumber)].map((_, i) => (
                    <div key={i} className="h-8 w-8 bg-kidz-primary rounded-full mx-1"></div>
                  ))}
                </div>
                
                <div className="bg-white p-4 rounded-lg mb-4">
                  <p className="text-xl">Activity: {numberItems[currentNumber as keyof typeof numberItems].activity}</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg mb-6">
                  <p className="text-xl">Fun Fact: {numberItems[currentNumber as keyof typeof numberItems].funFact}</p>
                </div>
                
                <div className="flex justify-center gap-4">
                  <Button 
                    onClick={prevNumber}
                    variant="outline"
                    className="border-kidz-primary hover:bg-kidz-light px-8"
                  >
                    Previous Number
                  </Button>
                  <Button 
                    onClick={nextNumber}
                    className="bg-kidz-primary hover:bg-kidz-dark px-8"
                  >
                    Next Number
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default EarlyLearning;

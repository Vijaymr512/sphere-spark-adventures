
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
    "A": { word: "Apple", activity: "Can you draw an apple?", image: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?auto=format&fit=crop&w=300&h=300" },
    "B": { word: "Butterfly", activity: "Can you flap your arms like butterfly wings?", image: "https://images.unsplash.com/photo-1590593162201-f67611a18b87?auto=format&fit=crop&w=300&h=300" },
    "C": { word: "Cat", activity: "Can you purr and meow like a cat?", image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=300&h=300" },
    "D": { word: "Dog", activity: "Can you bark like a dog?", image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=300&h=300" },
    "E": { word: "Elephant", activity: "Can you swing your arm like an elephant's trunk?", image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=300&h=300" },
    "F": { word: "Fish", activity: "Can you pretend to swim like a fish?", image: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=300&h=300" },
    "G": { word: "Giraffe", activity: "Can you stretch your neck tall like a giraffe?", image: "https://images.unsplash.com/photo-1547721064-da6cfb341d50?auto=format&fit=crop&w=300&h=300" },
    "H": { word: "House", activity: "Can you draw a house?", image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=300&h=300" },
    "I": { word: "Ice Cream", activity: "Can you pretend to lick an ice cream cone?", image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=300&h=300" },
    "J": { word: "Jump", activity: "Can you jump up and down five times?", image: "https://images.unsplash.com/photo-1503789146722-cf137a3c0fea?auto=format&fit=crop&w=300&h=300" },
    "K": { word: "Kite", activity: "Can you pretend to fly a kite?", image: "https://images.unsplash.com/photo-1620287340832-afc0f2113e7f?auto=format&fit=crop&w=300&h=300" },
    "L": { word: "Lion", activity: "Can you roar like a lion?", image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=300&h=300" },
    "M": { word: "Moon", activity: "Can you draw a crescent moon?", image: "https://images.unsplash.com/photo-1532693322450-2cb5c511067d?auto=format&fit=crop&w=300&h=300" },
    "N": { word: "Nest", activity: "Can you use your hands to show a bird's nest?", image: "https://images.unsplash.com/photo-1553752448-7a16e2d2a0af?auto=format&fit=crop&w=300&h=300" },
    "O": { word: "Octopus", activity: "Can you wiggle like an octopus has 8 arms?", image: "https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?auto=format&fit=crop&w=300&h=300" },
    "P": { word: "Penguin", activity: "Can you waddle like a penguin?", image: "https://images.unsplash.com/photo-1598439210625-5067c578f3f6?auto=format&fit=crop&w=300&h=300" },
    "Q": { word: "Queen", activity: "Can you pretend to wear a crown and wave?", image: "https://images.unsplash.com/photo-1595981234058-a9302fb97229?auto=format&fit=crop&w=300&h=300" },
    "R": { word: "Rainbow", activity: "Can you name the colors of the rainbow?", image: "https://images.unsplash.com/photo-1619253057739-4002ab266565?auto=format&fit=crop&w=300&h=300" },
    "S": { word: "Snake", activity: "Can you slither like a snake?", image: "https://images.unsplash.com/photo-1570741066052-817c6de995c8?auto=format&fit=crop&w=300&h=300" },
    "T": { word: "Tiger", activity: "Can you prowl like a tiger?", image: "https://images.unsplash.com/photo-1549480017-d76466a4b7e8?auto=format&fit=crop&w=300&h=300" },
    "U": { word: "Umbrella", activity: "Can you pretend to open an umbrella?", image: "https://images.unsplash.com/photo-1553786801-9100a9a4d1d9?auto=format&fit=crop&w=300&h=300" },
    "V": { word: "Volcano", activity: "Can you pretend to erupt like a volcano?", image: "https://images.unsplash.com/photo-1541034413774-d541014b060b?auto=format&fit=crop&w=300&h=300" },
    "W": { word: "Whale", activity: "Can you make a big splash like a whale?", image: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=300&h=300" },
    "X": { word: "X-ray", activity: "Can you see through things with pretend x-ray vision?", image: "https://images.unsplash.com/photo-1583256805166-11feb35c1c38?auto=format&fit=crop&w=300&h=300" },
    "Y": { word: "Yo-yo", activity: "Can you pretend to play with a yo-yo?", image: "https://images.unsplash.com/photo-1618335829737-2228915674e0?auto=format&fit=crop&w=300&h=300" },
    "Z": { word: "Zebra", activity: "Can you gallop like a zebra?", image: "https://images.unsplash.com/photo-1501706362039-c06b2d715385?auto=format&fit=crop&w=300&h=300" }
  };
  
  const numberItems = {
    1: { activity: "Can you find 1 toy in your room?", funFact: "1 is the first odd number.", image: "https://images.unsplash.com/photo-1531564701487-f238224b7ce3?auto=format&fit=crop&w=300&h=300" },
    2: { activity: "Can you point to 2 of your body parts?", funFact: "We have 2 eyes, 2 ears, 2 hands, and 2 feet!", image: "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?auto=format&fit=crop&w=300&h=300" },
    3: { activity: "Can you jump 3 times?", funFact: "There are 3 primary colors: red, blue, and yellow.", image: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?auto=format&fit=crop&w=300&h=300" },
    4: { activity: "Can you clap 4 times?", funFact: "A car has 4 wheels, and a chair has 4 legs.", image: "https://images.unsplash.com/photo-1642458798325-ffee40e75f0d?auto=format&fit=crop&w=300&h=300" },
    5: { activity: "Can you show 5 fingers?", funFact: "We have 5 fingers on each hand and 5 toes on each foot.", image: "https://images.unsplash.com/photo-1623189663232-503303d9a368?auto=format&fit=crop&w=300&h=300" },
    6: { activity: "Can you touch your toes 6 times?", funFact: "An insect has 6 legs.", image: "https://images.unsplash.com/photo-1649542113674-300311a24ed5?auto=format&fit=crop&w=300&h=300" },
    7: { activity: "Can you name 7 animals?", funFact: "There are 7 days in a week.", image: "https://images.unsplash.com/photo-1641005906562-7ecb60c0ddf4?auto=format&fit=crop&w=300&h=300" },
    8: { activity: "Can you spell your name 8 times?", funFact: "An octopus has 8 tentacles.", image: "https://images.unsplash.com/photo-1638867202992-a5805d0e5eb8?auto=format&fit=crop&w=300&h=300" },
    9: { activity: "Can you spin around 9 times?", funFact: "A cat has 9 lives (according to a popular saying).", image: "https://images.unsplash.com/photo-1649542113435-fc803f4a0c5b?auto=format&fit=crop&w=300&h=300" },
    10: { activity: "Can you count to 10 backwards?", funFact: "We have 10 fingers and 10 toes in total.", image: "https://images.unsplash.com/photo-1649542112050-a9686e3ba22c?auto=format&fit=crop&w=300&h=300" }
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
                
                <div className="mb-6 flex justify-center">
                  <img 
                    src={alphabetItems[currentLetter as keyof typeof alphabetItems].image} 
                    alt={`${currentLetter} for ${alphabetItems[currentLetter as keyof typeof alphabetItems].word}`}
                    className="rounded-lg shadow-md border-4 border-kidz-primary max-w-xs h-auto"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/300?text=' + alphabetItems[currentLetter as keyof typeof alphabetItems].word;
                    }}
                  />
                </div>
                
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
                
                <div className="mb-6 flex justify-center">
                  <img 
                    src={numberItems[currentNumber as keyof typeof numberItems].image} 
                    alt={`Number ${currentNumber}`}
                    className="rounded-lg shadow-md border-4 border-kidz-primary max-w-xs h-auto"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://via.placeholder.com/300?text=${currentNumber}`;
                    }}
                  />
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

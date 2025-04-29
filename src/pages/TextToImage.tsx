
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Image, 
  Search, 
  AlertTriangle,
  Wand
} from "lucide-react";

const TextToImage = () => {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [hasTypo, setHasTypo] = useState(false);

  // Dictionary to map keywords to specific image categories
  const imageCategories: Record<string, string> = {
    // Fruits
    "apple": "fruit/apple",
    "banana": "fruit/banana",
    "orange": "fruit/orange",
    "mango": "fruit/mango",
    "strawberry": "fruit/strawberry",
    "grape": "fruit/grapes",
    "watermelon": "fruit/watermelon",
    "pineapple": "fruit/pineapple",
    "peach": "fruit/peach",
    "pear": "fruit/pear",
    "kiwi": "fruit/kiwi",
    
    // Animals
    "cat": "animal/cat",
    "dog": "animal/dog",
    "elephant": "animal/elephant",
    "lion": "animal/lion",
    "tiger": "animal/tiger",
    "zebra": "animal/zebra",
    "giraffe": "animal/giraffe",
    "monkey": "animal/monkey",
    "bear": "animal/bear",
    "rabbit": "animal/rabbit",
    "bird": "animal/bird",
    "fish": "animal/fish",
    
    // Objects
    "car": "object/car",
    "bike": "object/bicycle",
    "laptop": "object/laptop",
    "phone": "object/smartphone",
    "chair": "object/chair",
    "table": "object/table",
    "book": "object/book",
    "pen": "object/pen",
    "pencil": "object/pencil",
    "house": "object/house",
    "tree": "object/tree",
    "flower": "object/flower",
  };

  // Mock dictionary for spell checking and suggestions - expanded with more terms
  const dictionary: Record<string, string[]> = {
    // Fruit misspellings
    "aple": ["apple", "maple"],
    "banan": ["banana", "bananas"],
    "mago": ["mango", "magic", "mayo"],
    "ornge": ["orange", "arrange"],
    "grap": ["grape", "grasp", "graph"],
    "strwbery": ["strawberry", "strawberries"],
    "pech": ["peach", "preach", "perch"],
    "kiwifruit": ["kiwi", "kiwifruit", "fruit"],
    "pinepple": ["pineapple", "pine", "purple"],
    
    // Animal misspellings
    "kat": ["cat", "kit", "kite"],
    "dogg": ["dog", "doge", "dodge"],
    "elefant": ["elephant", "elegant", "element"],
    "tigr": ["tiger", "tight", "tire"],
    "loin": ["lion", "loin", "line"],
    "zebr": ["zebra", "fiber", "saber"],
    "beear": ["bear", "beer", "beard"],
    "monky": ["monkey", "monks", "money"],
    "giraf": ["giraffe", "graph", "graft"],
    "rabit": ["rabbit", "rabid", "habit"],
    
    // Object misspellings
    "labtop": ["laptop", "lab top", "tabletop"],
    "phon": ["phone", "phony", "prone"],
    "carr": ["car", "care", "cart"],
    "byke": ["bike", "bake", "byte"],
    "chare": ["chair", "charm", "chase"],
    "tabel": ["table", "label", "tablet"],
    "boook": ["book", "brook", "booth"],
    "pensil": ["pencil", "pensile", "stencil"],
    "flawer": ["flower", "flawed", "flayer"],
    "hous": ["house", "hours", "mouse"],
    "tre": ["tree", "true", "trek"],
    
    // Additional common misspellings
    "iland": ["island", "inland", "ireland"],
    "juise": ["juice", "juicy", "june"],
    "mountan": ["mountain", "maintain", "fountain"],
    "ocen": ["ocean", "open", "omen"],
    "plantt": ["plant", "planet", "plenty"],
    "rivr": ["river", "rival", "rivet"],
    "staar": ["star", "stare", "stair"],
    "flyd": ["fly", "fled", "flood"],
  };

  // Mock dictionary to check for inappropriate content
  const inappropriateTerms = [
    "weapon", "gun", "knife", "violence", "crime", "illegal", "drugs", "murder", 
    "adult", "explicit", "terror", "kill", "harm", "dangerous", "inappropriate"
  ];

  const checkForInappropriate = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    return inappropriateTerms.some(term => lowerText.includes(term));
  };

  const checkForTypos = (text: string): string[] => {
    const words = text.toLowerCase().split(" ");
    let suggestions: string[] = [];
    
    // Check if any word in the input matches our dictionary of misspellings
    for (const word of words) {
      if (dictionary[word]) {
        setHasTypo(true);
        return dictionary[word];
      }
      
      // Check for partial matches or close words
      const closeMatches = Object.keys(dictionary).filter(dictWord => 
        dictWord.includes(word) || word.includes(dictWord)
      );
      
      if (closeMatches.length > 0) {
        // Get suggestions for the first close match
        if (dictionary[closeMatches[0]]) {
          setHasTypo(true);
          return dictionary[closeMatches[0]];
        }
      }
    }
    
    // If we don't find any typos, check if the word exists in our categories
    if (!words.some(word => imageCategories[word.toLowerCase()])) {
      // If word doesn't exist in our categories, suggest some common words
      setHasTypo(true);
      return Object.keys(imageCategories).slice(0, 4);
    }
    
    setHasTypo(false);
    return suggestions;
  };

  const generateImage = (inputText: string) => {
    setIsLoading(true);
    setSuggestions([]);
    
    // Check for inappropriate content
    if (checkForInappropriate(inputText)) {
      toast({
        title: "Content Warning",
        description: "Please use appropriate words for image creation.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    // Helper function to get a more accurate image for the input text
    const getImageUrl = (text: string) => {
      const cleanText = text.toLowerCase().trim();
      const words = cleanText.split(" ");
      
      // Check if any word in the input matches our categories
      for (const word of words) {
        if (imageCategories[word]) {
          // We found a match in our categories
          const category = imageCategories[word];
          const categoryType = category.split("/")[0];
          const item = category.split("/")[1];
          
          // Return specific image based on category
          return `https://source.unsplash.com/featured/?${item},${categoryType}`;
        }
      }
      
      // If no specific category is found, use the full text as search term
      return `https://source.unsplash.com/featured/?${cleanText}`;
    };
    
    // Mock image generation with more accurate unsplash search
    setTimeout(() => {
      const imageUrl = getImageUrl(inputText);
      setGeneratedImage(`${imageUrl}&w=500&h=500&fit=crop&q=80`);
      
      toast({
        title: "Image Generated!",
        description: `Created an image for "${inputText}"`,
      });
      
      setIsLoading(false);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPrompt(value);
    
    // Check for typos and provide suggestions
    if (value.trim()) {
      const newSuggestions = checkForTypos(value);
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    generateImage(prompt.trim());
  };

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
    setSuggestions([]);
    generateImage(suggestion);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-kidz-background">
      <DashboardSidebar />
      
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
        <div className="kidz-container">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <Image className="mr-2 h-8 w-8 text-kidz-primary" />
              Text to Image Magic
            </h1>
            <p className="text-gray-600">
              Type what you want to see, and watch it appear like magic!
            </p>
          </header>

          <div className="kidz-card border-kidz-primary mb-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="prompt" className="block text-lg font-medium mb-2">
                  What would you like to see?
                </label>
                <div className="flex gap-2">
                  <Input
                    id="prompt"
                    value={prompt}
                    onChange={handleInputChange}
                    placeholder="Type something like 'cat' or 'apple'"
                    className="text-base"
                  />
                  <Button 
                    type="submit" 
                    className="bg-kidz-primary hover:bg-kidz-dark flex-shrink-0"
                    disabled={isLoading || !prompt.trim()}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <span className="animate-spin mr-2">⭐</span> Creating...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Wand className="mr-2 h-4 w-4" /> Create Image
                      </span>
                    )}
                  </Button>
                </div>
              </div>
              
              {hasTypo && suggestions.length > 0 && (
                <div className="bg-amber-50 p-3 rounded-md">
                  <p className="text-sm font-medium mb-2 flex items-center">
                    <Search className="h-4 w-4 mr-1" />
                    Did you mean:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="bg-white hover:bg-kidz-light border-kidz-light"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </form>
          </div>

          <div className="kidz-card">
            <h2 className="text-xl font-bold mb-4">Your Magic Image</h2>
            
            {generatedImage ? (
              <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                <img 
                  src={generatedImage} 
                  alt={prompt} 
                  className="mx-auto rounded-md max-h-[400px] object-contain"
                />
                <p className="text-center mt-3 text-gray-600 italic">
                  "{prompt}"
                </p>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-10 text-center">
                <Image className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  Your image will appear here once you create it!
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Type something above and click "Create Image"
                </p>
              </div>
            )}
          </div>
          
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h3 className="text-lg font-medium flex items-center text-blue-700 mb-2">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Tips for Great Images
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-blue-600">
              <li>Try simple words like "apple", "dog", or "car"</li>
              <li>Be specific about what you want to see</li>
              <li>Add colors like "red balloon" or "blue sky"</li>
              <li>If you see suggestions, try clicking on them!</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TextToImage;

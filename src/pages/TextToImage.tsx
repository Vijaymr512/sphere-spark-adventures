
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

  // Mock dictionary to check for inappropriate content
  const inappropriateTerms = [
    "weapon", "gun", "knife", "violence", "crime", "illegal", "drugs", "murder", 
    "adult", "explicit", "terror", "kill", "harm", "dangerous", "inappropriate"
  ];

  // Mock dictionary for spell checking and suggestions
  const dictionary: Record<string, string[]> = {
    "aple": ["apple", "maple", "apply"],
    "banan": ["banana", "bananas", "banal"],
    "carret": ["carrot", "caret", "carpet"],
    "kat": ["cat", "kit", "kite"],
    "dogg": ["dog", "doge", "dodge"],
    "elefant": ["elephant", "elegant", "element"],
    "flawer": ["flower", "flawed", "flayer"],
    "hors": ["horse", "hours", "house"],
    "iland": ["island", "inland", "ireland"],
    "juise": ["juice", "juicy", "june"],
    // Add more common misspellings children might make
  };

  const checkForInappropriate = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    return inappropriateTerms.some(term => lowerText.includes(term));
  };

  const checkForTypos = (text: string): string[] => {
    // Basic implementation - check if the exact word is in our dictionary
    const words = text.toLowerCase().split(" ");
    let hasSuggestion = false;
    
    for (const word of words) {
      if (dictionary[word]) {
        setHasTypo(true);
        return dictionary[word];
      }
    }
    
    setHasTypo(false);
    return [];
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
    
    // Mock image generation (in a real app, this would call an API)
    setTimeout(() => {
      // For the demo, we'll use placeholder images based on the input text
      const placeholders = [
        "photo-1582562124811-c09040d0a901", // cat
        "photo-1618160702438-9b02ab6515c9", // fruit
        "photo-1506744038136-46273834b3fb", // nature
        "photo-1465146344425-f00d5f5c8f07", // flowers
      ];

      const randomIndex = Math.floor(Math.random() * placeholders.length);
      setGeneratedImage(`https://images.unsplash.com/${placeholders[randomIndex]}?w=500&h=500&fit=crop&q=80`);
      
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
                    placeholder="Type something like 'a happy cat' or 'an apple tree'"
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
              <li>Be specific about what you want to see</li>
              <li>Try adding colors like "red balloon" or "blue sky"</li>
              <li>Include details like "a cat playing with yarn"</li>
              <li>Keep your descriptions child-friendly</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TextToImage;

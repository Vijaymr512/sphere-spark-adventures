
import { useState, useRef } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { BookOpen, Volume2, Pause } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Stories = () => {
  const { toast } = useToast();
  const [currentStory, setCurrentStory] = useState({
    title: "The Magical Garden",
    content: `Once upon a time, there was a little girl named Lily who discovered a hidden garden behind her new house. 
    
    The garden was unlike any she had ever seen before. The flowers seemed to sparkle in the sunlight, and the butterflies had wings that changed colors as they fluttered by.
    
    As Lily explored deeper into the garden, she found a small golden key next to a talking rabbit.
    
    "Hello there!" said the rabbit. "I've been waiting for someone to find this key. It opens a special door that leads to a world of adventure!"
    
    Lily followed the rabbit to an old tree with a tiny wooden door at its base. She used the golden key to unlock it, and to her amazement, the door swung open to reveal a magical world filled with friendly creatures and exciting places to explore.
    
    From that day on, Lily visited the magical garden every afternoon, making new friends and having wonderful adventures. And she learned that sometimes the most extraordinary things can be found in the most ordinary places - you just need to look with an open heart.
    
    The End.`
  });
  
  const stories = [
    {
      title: "The Brave Little Sailboat",
      content: `In a small harbor by the sea lived a little sailboat named Sammy. While all the other boats were big and strong, Sammy was small with a bright blue sail.
      
      "You're too tiny to sail the big waters," the larger boats would say. But Sammy dreamed of adventure beyond the harbor.
      
      One day, a storm came and a little bird got separated from its family. The bird landed on Sammy's deck, shivering with fear.
      
      "Don't worry," Sammy said. "I'll help you find your family."
      
      Though the waters were rough, Sammy was determined. He sailed carefully, following the bird's directions. The big boats were too afraid of the stormy seas to help.
      
      After a long journey, they found the bird's family on a distant island. They were so thankful to Sammy for bringing their little one home.
      
      When Sammy returned to the harbor, the other boats cheered. They realized that being brave and kind matters more than being big and strong.
      
      From that day on, Sammy became known as the bravest boat in the harbor, proving that you don't have to be big to do big things.
      
      The End.`
    },
    {
      title: "The Star Who Couldn't Shine",
      content: `High up in the night sky lived a little star named Stella who had a problem - she couldn't shine like the other stars.
      
      "Why can't I twinkle like everyone else?" Stella would ask, feeling sad as she watched the other stars light up the night sky.
      
      Moon, who was kind and wise, told Stella, "Everyone has their own special gift. You just haven't found yours yet."
      
      Stella decided to try different ways to shine. She tried spinning like the planets, zooming like comets, and even asked the sun for advice. Nothing worked.
      
      One night, a little girl on Earth was lost in the woods. She was scared and couldn't find her way home in the darkness.
      
      Stella felt sorry for the girl and wished so hard to help that suddenly, something amazing happened. Instead of twinkling with light, Stella began to sing! Her beautiful melody floated down to Earth like a path of music.
      
      The little girl followed the sound and found her way home safely.
      
      "You see," said Moon, "your gift isn't shining with light, but with music. Your song lights the way in a different but equally important way."
      
      From then on, Stella sang every night, creating melodies that helped guide lost travelers and brought joy to anyone who listened.
      
      The End.`
    }
  ];

  const [isPlaying, setIsPlaying] = useState(false);
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);

  const loadNewStory = () => {
    // Stop any current narration when loading a new story
    if (isPlaying) {
      stopSpeech();
    }
    
    const randomIndex = Math.floor(Math.random() * stories.length);
    setCurrentStory(stories[randomIndex]);
  };

  const startSpeech = () => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      // Create a new speech synthesis utterance
      const utterance = new SpeechSynthesisUtterance(currentStory.content);
      utterance.rate = 0.9; // Slightly slower for better comprehension
      utterance.pitch = 1.1; // Slightly higher pitch for a friendlier voice
      
      // Get available voices and try to select a good one
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Google') && voice.name.includes('US English') && voice.name.includes('Female')
      ) || voices.find(voice => 
        voice.name.includes('Female') && voice.name.includes('US')
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      // Add end event to update UI when speech ends
      utterance.onend = () => {
        setIsPlaying(false);
        speechSynthRef.current = null;
        
        toast({
          title: "Story ended",
          description: "The narration has finished.",
        });
      };
      
      // Store reference and play
      speechSynthRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
      
      toast({
        title: "Story Time",
        description: "Story narration has started!",
      });
    } else {
      toast({
        title: "Not supported",
        description: "Speech synthesis is not supported in your browser.",
        variant: "destructive"
      });
    }
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    speechSynthRef.current = null;
  };

  const toggleSpeech = () => {
    if (isPlaying) {
      stopSpeech();
    } else {
      startSpeech();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-kidz-background">
      <DashboardSidebar />
      
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
        <div className="kidz-container">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Story Time</h1>
            <p className="text-gray-600">Magical stories to spark imagination!</p>
          </header>

          <div className="kidz-card border-kidz-primary max-w-4xl mx-auto">
            <div className="flex items-center mb-4">
              <div className="bg-kidz-light p-3 rounded-full">
                <BookOpen className="h-6 w-6 text-kidz-dark" />
              </div>
              <h3 className="text-xl font-bold ml-3">{currentStory.title}</h3>
            </div>
            
            <div className="bg-kidz-light/50 rounded-lg p-6 mb-6 border border-kidz-light">
              <div className="prose max-w-none">
                {currentStory.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-lg">{paragraph}</p>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                onClick={loadNewStory}
                className="px-6 py-2 text-lg bg-kidz-primary hover:bg-kidz-dark"
              >
                Read Another Story
              </Button>
              
              <Button
                onClick={toggleSpeech}
                className={`px-6 py-2 text-lg ${isPlaying ? "bg-amber-500 hover:bg-amber-600" : "bg-kidz-secondary hover:bg-kidz-accent"}`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="mr-2 h-5 w-5" />
                    Stop Narration
                  </>
                ) : (
                  <>
                    <Volume2 className="mr-2 h-5 w-5" />
                    Read Aloud
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Stories;

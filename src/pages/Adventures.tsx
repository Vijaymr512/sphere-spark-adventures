
import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const Adventures = () => {
  const [adventure, setAdventure] = useState({
    title: "The Enchanted Forest",
    scene: "start",
    content: "You find yourself at the edge of an enchanted forest. The trees sparkle with magical light, and you can hear strange but friendly sounds coming from within. What would you like to do?",
    choices: [
      { text: "Follow the glowing path deeper into the forest", nextScene: "path" },
      { text: "Climb a tree to get a better view", nextScene: "tree" }
    ]
  });

  const adventureScenes = {
    start: {
      title: "The Enchanted Forest",
      content: "You find yourself at the edge of an enchanted forest. The trees sparkle with magical light, and you can hear strange but friendly sounds coming from within. What would you like to do?",
      choices: [
        { text: "Follow the glowing path deeper into the forest", nextScene: "path" },
        { text: "Climb a tree to get a better view", nextScene: "tree" }
      ]
    },
    path: {
      title: "The Magical Path",
      content: "You follow the glowing path as it winds through the forest. Soon, you come across a small bridge crossing a bubbling stream. Next to the bridge sits a friendly talking frog wearing a tiny crown.",
      choices: [
        { text: "Talk to the frog king", nextScene: "frog" },
        { text: "Cross the bridge and continue on the path", nextScene: "bridge" }
      ]
    },
    tree: {
      title: "The Viewpoint",
      content: "You climb up a large, friendly tree that seems to help you by bending its branches for easier climbing. From the top, you can see the entire forest. You notice a small cottage with a smoking chimney in one direction and a sparkling lake in another.",
      choices: [
        { text: "Climb down and head toward the cottage", nextScene: "cottage" },
        { text: "Climb down and head toward the sparkling lake", nextScene: "lake" }
      ]
    },
    frog: {
      title: "The Frog King",
      content: "\"Hello there!\" says the frog king. \"I've been waiting for a brave adventurer like you! My kingdom is under a spell from a forgetful wizard who can't remember how to undo it. Could you help us?\"",
      choices: [
        { text: "Offer to help the frog king", nextScene: "help_frog" },
        { text: "Politely decline and continue your journey", nextScene: "bridge" }
      ]
    },
    bridge: {
      title: "The Other Side",
      content: "You cross the bridge and continue along the path. It leads to a beautiful meadow filled with flowers that sing gentle melodies when the breeze blows through them. In the center of the meadow is a circle of mushrooms that looks like a perfect place for fairy gatherings.",
      choices: [
        { text: "Step into the mushroom circle", nextScene: "fairies" },
        { text: "Rest and enjoy the singing flowers", nextScene: "rest" }
      ]
    },
    cottage: {
      title: "The Witch's Cottage",
      content: "You approach the cozy cottage and knock on the door. It opens to reveal a kind-looking witch with silver hair and a warm smile. \"I've been expecting you,\" she says. \"Would you like to come in for some magic tea and cookies?\"",
      choices: [
        { text: "Accept the witch's invitation", nextScene: "witch_tea" },
        { text: "Politely decline and ask for directions", nextScene: "directions" }
      ]
    },
    help_frog: {
      title: "The Quest Begins",
      content: "\"Wonderful!\" croaks the frog king. \"To break the spell, you need to find three magic items: a golden leaf, a starlight feather, and a dewdrop from the oldest tree in the forest.\" He gives you a small enchanted pouch to carry these items. \"Good luck on your quest!\"",
      choices: [
        { text: "Start your quest for the magical items", nextScene: "quest" },
        { text: "Ask for more information about where to find these items", nextScene: "more_info" }
      ]
    },
    fairies: {
      title: "The Fairy Gathering",
      content: "As you step into the mushroom circle, tiny lights begin to appear all around you. They're fairies! They circle around you, sprinkling magical dust that makes you feel lighter than air. One fairy with blue wings approaches you.",
      choices: [
        { text: "Ask the fairies for help on your adventure", nextScene: "fairy_help" },
        { text: "Thank them and continue exploring", nextScene: "meadow_exit" }
      ]
    },
    rest: {
      title: "A Musical Rest",
      content: "You sit among the singing flowers, enjoying their beautiful melodies. The music seems to energize you and fill you with joy. As you rest, a small rabbit with unusually bright eyes approaches you, carrying something shiny in its mouth.",
      choices: [
        { text: "Reach out gently to the rabbit", nextScene: "rabbit" },
        { text: "Stay still and see what the rabbit does", nextScene: "rabbit_waits" }
      ]
    },
    witch_tea: {
      title: "Magic Tea Party",
      content: "You enjoy delicious cookies that change flavor with every bite and tea that sparkles and swirls with colors. The witch tells you she's a guardian of the forest and senses great potential in you. \"I can teach you a simple spell if you'd like,\" she offers.",
      choices: [
        { text: "Learn a spell from the witch", nextScene: "learn_spell" },
        { text: "Ask about the secrets of the forest instead", nextScene: "forest_secrets" }
      ]
    },
    quest: {
      title: "The Adventure Continues",
      content: "You've embarked on an exciting quest to help the frog kingdom! Your journey through the enchanted forest will be filled with magic, new friends, and challenges. This adventure will continue next time!",
      choices: [
        { text: "Start a new adventure", nextScene: "start" },
        { text: "Return to the dashboard", nextScene: "end" }
      ]
    }
  };

  const handleChoice = (nextScene: string) => {
    if (nextScene === "end") {
      // Return to dashboard logic would go here
      return;
    }
    
    const newScene = adventureScenes[nextScene as keyof typeof adventureScenes];
    if (newScene) {
      setAdventure({...newScene, scene: nextScene});
      window.scrollTo(0, 0);
    }
  };

  const resetAdventure = () => {
    setAdventure({...adventureScenes.start, scene: "start"});
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-kidz-background">
      <DashboardSidebar />
      
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
        <div className="kidz-container">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Roleplay Adventure</h1>
            <p className="text-gray-600">Become the hero of your own story!</p>
          </header>

          <div className="kidz-card border-kidz-primary max-w-4xl mx-auto">
            <div className="flex items-center mb-4">
              <div className="bg-kidz-light p-3 rounded-full">
                <Star className="h-6 w-6 text-kidz-dark" />
              </div>
              <h3 className="text-xl font-bold ml-3">{adventure.title}</h3>
            </div>
            
            <div className="bg-kidz-light/50 rounded-lg p-6 mb-6 border border-kidz-light">
              <p className="text-xl mb-8">{adventure.content}</p>
              
              <div className="space-y-4">
                {adventure.choices.map((choice, index) => (
                  <Button 
                    key={index}
                    onClick={() => handleChoice(choice.nextScene)}
                    className="w-full text-left justify-start text-lg p-4 bg-white hover:bg-kidz-light text-kidz-dark border border-kidz-light"
                  >
                    {choice.text}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="text-center">
              <Button 
                onClick={resetAdventure}
                variant="outline"
                className="border-kidz-primary hover:bg-kidz-light"
              >
                Start Over
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Adventures;

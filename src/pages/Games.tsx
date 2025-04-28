
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";

const Games = () => {
  const { toast } = useToast();
  const [currentGame, setCurrentGame] = useState("math");
  const [mathQuestion, setMathQuestion] = useState({ question: "5 + 3 = ?", answer: "8" });
  const [userAnswer, setUserAnswer] = useState("");
  const [riddle, setRiddle] = useState({
    question: "I'm tall when I'm young, and short when I'm old. What am I?",
    answer: "A candle",
    revealed: false
  });
  
  const mathQuestions = [
    { question: "7 + 4 = ?", answer: "11" },
    { question: "10 - 3 = ?", answer: "7" },
    { question: "2 × 5 = ?", answer: "10" },
    { question: "12 ÷ 3 = ?", answer: "4" },
    { question: "9 + 5 = ?", answer: "14" },
  ];
  
  const riddles = [
    {
      question: "What has a head and a tail but no body?",
      answer: "A coin",
      revealed: false
    },
    {
      question: "What has many keys but can't open a single lock?",
      answer: "A piano",
      revealed: false
    },
    {
      question: "What gets wetter as it dries?",
      answer: "A towel",
      revealed: false
    }
  ];

  const handleNewMathQuestion = () => {
    const randomIndex = Math.floor(Math.random() * mathQuestions.length);
    setMathQuestion(mathQuestions[randomIndex]);
    setUserAnswer("");
  };

  const checkMathAnswer = () => {
    if (userAnswer === mathQuestion.answer) {
      toast({
        title: "Correct! 🎉",
        description: "Great job solving the math problem!",
      });
      setTimeout(handleNewMathQuestion, 1500);
    } else {
      toast({
        title: "Not quite right.",
        description: "Try again!",
        variant: "destructive"
      });
    }
  };
  
  const handleNewRiddle = () => {
    const randomIndex = Math.floor(Math.random() * riddles.length);
    setRiddle({ ...riddles[randomIndex], revealed: false });
  };

  const revealRiddleAnswer = () => {
    setRiddle({ ...riddle, revealed: true });
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-kidz-background">
      <DashboardSidebar />
      
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
        <div className="kidz-container">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Brain Games</h1>
            <p className="text-gray-600">Fun puzzles and challenges to exercise your brain!</p>
          </header>

          <div className="flex flex-wrap gap-4 mb-8">
            <Button 
              onClick={() => setCurrentGame("math")}
              variant={currentGame === "math" ? "default" : "outline"}
              className={currentGame === "math" ? "bg-kidz-primary" : ""}
            >
              Math Challenge
            </Button>
            <Button 
              onClick={() => setCurrentGame("riddles")}
              variant={currentGame === "riddles" ? "default" : "outline"}
              className={currentGame === "riddles" ? "bg-kidz-primary" : ""}
            >
              Riddles
            </Button>
          </div>

          {currentGame === "math" && (
            <div className="kidz-card border-kidz-secondary max-w-3xl mx-auto">
              <div className="flex items-center mb-4">
                <div className="bg-kidz-light p-3 rounded-full">
                  <Lightbulb className="h-6 w-6 text-kidz-dark" />
                </div>
                <h3 className="text-xl font-bold ml-3">Math Challenge</h3>
              </div>
              
              <div className="bg-kidz-light/50 rounded-lg p-6 mb-6 border border-kidz-light text-center">
                <p className="text-3xl font-bold mb-8">{mathQuestion.question}</p>
                
                <div className="max-w-xs mx-auto mb-6">
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className="w-full text-center text-2xl p-3 border border-gray-300 rounded-md"
                    placeholder="Your answer"
                  />
                </div>
                
                <Button 
                  onClick={checkMathAnswer}
                  className="bg-kidz-primary hover:bg-kidz-dark mr-2"
                >
                  Check Answer
                </Button>
                <Button 
                  onClick={handleNewMathQuestion}
                  variant="outline"
                  className="border-kidz-primary"
                >
                  New Question
                </Button>
              </div>
            </div>
          )}
          
          {currentGame === "riddles" && (
            <div className="kidz-card border-kidz-secondary max-w-3xl mx-auto">
              <div className="flex items-center mb-4">
                <div className="bg-kidz-light p-3 rounded-full">
                  <Lightbulb className="h-6 w-6 text-kidz-dark" />
                </div>
                <h3 className="text-xl font-bold ml-3">Riddles</h3>
              </div>
              
              <div className="bg-kidz-light/50 rounded-lg p-6 mb-6 border border-kidz-light text-center">
                <p className="text-2xl font-medium mb-8">{riddle.question}</p>
                
                {riddle.revealed ? (
                  <div className="mb-6">
                    <p className="text-xl font-bold text-kidz-primary">Answer:</p>
                    <p className="text-2xl">{riddle.answer}</p>
                  </div>
                ) : (
                  <Button 
                    onClick={revealRiddleAnswer}
                    className="bg-kidz-primary hover:bg-kidz-dark mb-6"
                  >
                    Reveal Answer
                  </Button>
                )}
                
                <div>
                  <Button 
                    onClick={handleNewRiddle}
                    variant="outline"
                    className="border-kidz-primary"
                  >
                    New Riddle
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

export default Games;


import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Gamepad } from "lucide-react";

const OfflineGames = () => {
  const games = [
    {
      title: "Treasure Hunt",
      description: "Hide small treasures or treats around your home or yard. Create clues that lead from one hiding spot to the next. The final clue leads to the main treasure!",
      age: "5-12",
      players: "2+",
      materials: "Paper for clues, small prizes or treats"
    },
    {
      title: "Simon Says",
      description: "One player is 'Simon' and gives commands. If Simon begins a command with 'Simon says...', players must obey. If not, players should not perform the action. Last player standing wins!",
      age: "4-10",
      players: "3+",
      materials: "None needed"
    },
    {
      title: "Shadow Puppets",
      description: "Use a flashlight to create shadows on the wall and make different animal shapes with your hands. Take turns guessing what each shadow represents!",
      age: "3-8",
      players: "2+",
      materials: "Flashlight, dark room"
    },
    {
      title: "Paper Airplane Contest",
      description: "Everyone creates their own paper airplane design, then compete to see whose flies the farthest, does the most tricks, or stays in the air the longest.",
      age: "6-12",
      players: "2+",
      materials: "Paper, markers for decoration"
    },
    {
      title: "Charades",
      description: "Write down different animals, actions, or characters on slips of paper. Take turns drawing a slip and acting it out without speaking while others guess.",
      age: "5-12",
      players: "4+",
      materials: "Paper slips with ideas written on them"
    }
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-kidz-background">
      <DashboardSidebar />
      
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
        <div className="kidz-container">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Offline Games</h1>
            <p className="text-gray-600">Fun games to play away from screens!</p>
          </header>

          <div className="grid gap-6">
            {games.map((game, index) => (
              <div key={index} className="kidz-card border-kidz-primary">
                <div className="flex items-center mb-4">
                  <div className="bg-kidz-light p-3 rounded-full">
                    <Gamepad className="h-6 w-6 text-kidz-dark" />
                  </div>
                  <h3 className="text-xl font-bold ml-3">{game.title}</h3>
                </div>
                
                <div className="bg-kidz-light/50 rounded-lg p-4 mb-4 border border-kidz-light">
                  <p className="text-lg mb-4">{game.description}</p>
                  
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="bg-white p-2 rounded-md">
                      <span className="font-bold">Age Range:</span> {game.age}
                    </div>
                    <div className="bg-white p-2 rounded-md">
                      <span className="font-bold">Players:</span> {game.players}
                    </div>
                    <div className="bg-white p-2 rounded-md">
                      <span className="font-bold">Materials:</span> {game.materials}
                    </div>
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

export default OfflineGames;

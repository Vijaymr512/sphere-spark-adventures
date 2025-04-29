
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import DashboardSidebar from "@/components/DashboardSidebar";
import ActivityCard from "@/components/ActivityCard";
import { Button } from "@/components/ui/button";
import { 
  Calendar, BookOpen, Lightbulb, Gamepad,
  Star, Award, Edit, Check, Moon, Image
} from "lucide-react";

const Dashboard = () => {
  const { toast } = useToast();
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [dailyActivity] = useState("Make a paper boat and test it in water today!");
  const [drawingPrompt] = useState("Mix a unicorn, castle and magic wand to create a bedtime story!");
  const [loginRecords, setLoginRecords] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<string>("");
  
  // Load login records when component mounts
  useEffect(() => {
    // Get current user
    const user = localStorage.getItem("currentUser") || "";
    setCurrentUser(user);
    
    // Get login records
    const records = JSON.parse(localStorage.getItem("loginRecords") || "[]");
    setLoginRecords(records);
  }, []);
  
  const activities = [
    {
      icon: <Calendar className="h-6 w-6 text-kidz-dark" />,
      title: "Daily Activities",
      description: "Exciting and educational activities tailored just for you!",
      color: "bg-gradient-to-br from-white to-amber-50",
      link: "/dashboard/daily-activities"
    },
    {
      icon: <Moon className="h-6 w-6 text-kidz-dark" />,
      title: "Bedtime Story Mixer",
      description: "Create unique bedtime stories by mixing characters, places, and objects!",
      color: "bg-gradient-to-br from-white to-amber-50",
      link: "/dashboard/bedtime-stories"
    },
    {
      icon: <BookOpen className="h-6 w-6 text-kidz-dark" />,
      title: "Story Time",
      description: "Embark on magical adventures with interactive stories.",
      color: "bg-gradient-to-br from-white to-amber-50",
      link: "/dashboard/stories"
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-kidz-dark" />,
      title: "Brain Games",
      description: "Fun puzzles and quizzes to exercise your amazing brain!",
      color: "bg-gradient-to-br from-white to-amber-50",
      link: "/dashboard/games"
    },
    {
      icon: <Gamepad className="h-6 w-6 text-kidz-dark" />,
      title: "Offline Games",
      description: "Exciting games to play away from screens with friends and family.",
      color: "bg-gradient-to-br from-white to-amber-50",
      link: "/dashboard/offline-games"
    },
    {
      icon: <Image className="h-6 w-6 text-kidz-dark" />,
      title: "Text to Image",
      description: "Turn your words into pictures with our magical image creator!",
      color: "bg-gradient-to-br from-white to-amber-50",
      link: "/dashboard/text-to-image"
    },
    {
      icon: <Star className="h-6 w-6 text-kidz-dark" />,
      title: "Roleplay Adventures",
      description: "Become a hero in your own exciting adventure story!",
      color: "bg-gradient-to-br from-white to-amber-50",
      link: "/dashboard/adventures"
    },
    {
      icon: <Award className="h-6 w-6 text-kidz-dark" />,
      title: "DIY Projects",
      description: "Create amazing crafts and experiments with household items.",
      color: "bg-gradient-to-br from-white to-amber-50",
      link: "/dashboard/projects"
    },
    {
      icon: <Edit className="h-6 w-6 text-kidz-dark" />,
      title: "ABC & 123",
      description: "Fun ways to learn letters, numbers, and early skills.",
      color: "bg-gradient-to-br from-white to-amber-50",
      link: "/dashboard/early-learning"
    },
  ];

  const completeTask = () => {
    if (!completedTasks.includes(dailyActivity)) {
      setCompletedTasks([...completedTasks, dailyActivity]);
      toast({
        title: "Great job! Task completed! 🌟",
        description: "You've earned a star for your achievement chart!",
      });
    }
  };

  const generateNewPrompt = () => {
    toast({
      title: "Let's create a story! 📚",
      description: "Head to the Bedtime Story Mixer to create your own tale!",
    });
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-kidz-background">
      <DashboardSidebar />
      
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
        <div className="kidz-container">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome to KidzSphere{currentUser ? `, ${currentUser}` : ''}!</h1>
            <p className="text-gray-600">Ready for today's fun adventures?</p>
          </header>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Today's Highlights</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Daily Activity Card */}
              <div className="kidz-card border-kidz-primary">
                <div className="flex items-center mb-4">
                  <div className="bg-kidz-light p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-kidz-dark" />
                  </div>
                  <h3 className="text-xl font-bold ml-3">Daily Activity</h3>
                </div>
                
                <div className="bg-kidz-light/50 rounded-lg p-4 mb-4 border border-kidz-light">
                  <p className="text-lg">{dailyActivity}</p>
                </div>
                
                <Button 
                  onClick={completeTask}
                  className={`w-full ${completedTasks.includes(dailyActivity) ? 'bg-green-500 hover:bg-green-600' : 'bg-kidz-primary hover:bg-kidz-dark'}`}
                >
                  {completedTasks.includes(dailyActivity) ? (
                    <>
                      <Check className="mr-2 h-4 w-4" /> Completed
                    </>
                  ) : (
                    'Mark as Done'
                  )}
                </Button>
              </div>
              
              {/* Bedtime Story Card */}
              <div className="kidz-card border-kidz-secondary">
                <div className="flex items-center mb-4">
                  <div className="bg-kidz-light p-3 rounded-full">
                    <Moon className="h-6 w-6 text-kidz-dark" />
                  </div>
                  <h3 className="text-xl font-bold ml-3">Bedtime Story Idea</h3>
                </div>
                
                <div className="bg-kidz-light/50 rounded-lg p-4 mb-4 border border-kidz-light">
                  <p className="text-lg">{drawingPrompt}</p>
                </div>
                
                <Button 
                  onClick={generateNewPrompt}
                  className="w-full bg-kidz-secondary hover:bg-kidz-accent"
                >
                  Create a Story
                </Button>
              </div>
            </div>
          </section>

          {/* Login Records Section */}
          {loginRecords.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4">Recent Logins</h2>
              <div className="kidz-card">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-4">Email</th>
                        <th className="text-left py-2 px-4">Date & Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loginRecords.slice(-5).reverse().map((record, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-2 px-4">{record.email}</td>
                          <td className="py-2 px-4">
                            {new Date(record.timestamp).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          <section>
            <h2 className="text-2xl font-bold mb-6">Explore Activities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {activities.map((activity, index) => (
                <ActivityCard
                  key={index}
                  icon={activity.icon}
                  title={activity.title}
                  description={activity.description}
                  color={activity.color}
                  link={activity.link}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;


import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Calendar, Check } from "lucide-react";

const DailyActivities = () => {
  const { toast } = useToast();
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);
  const [activities] = useState([
    "Make a paper boat and test it in water today!",
    "Create a nature collage with leaves and flowers from your garden.",
    "Help prepare a meal with your family.",
    "Practice writing a letter to your future self.",
    "Build a tower using only items from your recycling bin."
  ]);

  const completeActivity = (activity: string) => {
    if (!completedActivities.includes(activity)) {
      setCompletedActivities([...completedActivities, activity]);
      toast({
        title: "Great job! Activity completed! 🌟",
        description: "You've earned a star for your achievement chart!",
      });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-kidz-background">
      <DashboardSidebar />
      
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
        <div className="kidz-container">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Daily Activities</h1>
            <p className="text-gray-600">Fun and educational activities for today!</p>
          </header>

          <div className="grid gap-6">
            {activities.map((activity, index) => (
              <div key={index} className="kidz-card border-kidz-primary">
                <div className="flex items-center mb-4">
                  <div className="bg-kidz-light p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-kidz-dark" />
                  </div>
                  <h3 className="text-xl font-bold ml-3">Activity {index + 1}</h3>
                </div>
                
                <div className="bg-kidz-light/50 rounded-lg p-4 mb-4 border border-kidz-light">
                  <p className="text-lg">{activity}</p>
                </div>
                
                <Button 
                  onClick={() => completeActivity(activity)}
                  className={`w-full ${completedActivities.includes(activity) ? 'bg-green-500 hover:bg-green-600' : 'bg-kidz-primary hover:bg-kidz-dark'}`}
                >
                  {completedActivities.includes(activity) ? (
                    <>
                      <Check className="mr-2 h-4 w-4" /> Completed
                    </>
                  ) : (
                    'Mark as Done'
                  )}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DailyActivities;

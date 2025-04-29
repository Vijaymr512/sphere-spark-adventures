
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Calendar, Check, Bell } from "lucide-react";

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
  const [userEmail, setUserEmail] = useState<string>("");

  // Load user email when component mounts
  useEffect(() => {
    const email = localStorage.getItem("userEmail") || "";
    setUserEmail(email);
  }, []);

  const completeActivity = (activity: string) => {
    if (!completedActivities.includes(activity)) {
      setCompletedActivities([...completedActivities, activity]);
      
      // Show regular completion toast
      toast({
        title: "Great job! Activity completed! 🌟",
        description: "You've earned a star for your achievement chart!",
      });
      
      // Simulate sending email notification by showing a toast
      // In a real app with backend, this would call an API
      if (userEmail) {
        setTimeout(() => {
          toast({
            title: "Notification Sent ✉️",
            description: `An email was sent to ${userEmail} about completing: "${activity.substring(0, 30)}..."`,
            variant: "default",
          });
        }, 1000);
        
        // Log the activity with email for demonstration
        const activityLog = {
          email: userEmail,
          activity: activity,
          completed: new Date().toISOString()
        };
        console.log("Activity completed:", activityLog);
        
        // Store in localStorage for demonstration
        const logs = JSON.parse(localStorage.getItem("activityLogs") || "[]");
        logs.push(activityLog);
        localStorage.setItem("activityLogs", JSON.stringify(logs));
      } else {
        toast({
          title: "No Email Found",
          description: "We couldn't send a notification as no email address was found.",
          variant: "destructive",
        });
      }
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
            {userEmail && (
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <Bell className="mr-1 h-4 w-4" />
                Notifications will be sent to: {userEmail}
              </div>
            )}
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

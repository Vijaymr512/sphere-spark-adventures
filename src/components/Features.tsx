
import { 
  BookOpen, Calendar, Star, Lightbulb, 
  Gamepad, Award, Edit, Moon 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock authentication check - replace with actual auth when integrated with Supabase
const useAuth = () => {
  // Check if user is logged in (e.g., by checking localStorage)
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return { isLoggedIn };
};

const features = [
  {
    icon: <Calendar className="h-8 w-8 text-kidz-primary" />,
    title: "Daily Activities",
    description: "Fun, age-appropriate activity suggestions every day to keep children engaged.",
    path: "/dashboard/daily-activities"
  },
  {
    icon: <Moon className="h-8 w-8 text-kidz-primary" />,
    title: "Bedtime Story Mixer",
    description: "Mix characters, places, and objects to create unique bedtime stories.",
    path: "/dashboard/bedtime-stories"
  },
  {
    icon: <BookOpen className="h-8 w-8 text-kidz-primary" />,
    title: "Story Time",
    description: "Magical, interactive stories that spark imagination and joy.",
    path: "/dashboard/stories"
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-kidz-primary" />,
    title: "Brain Games",
    description: "Puzzles and quizzes that make learning fun while developing critical thinking.",
    path: "/dashboard/games"
  },
  {
    icon: <Gamepad className="h-8 w-8 text-kidz-primary" />,
    title: "Offline Games",
    description: "Ideas for screen-free play that encourage physical activity and social skills.",
    path: "/dashboard/offline-games"
  },
  {
    icon: <Star className="h-8 w-8 text-kidz-primary" />,
    title: "Roleplay Adventures",
    description: "Interactive storytelling that puts kids in charge of exciting adventures.",
    path: "/dashboard/adventures"
  },
  {
    icon: <Award className="h-8 w-8 text-kidz-primary" />,
    title: "DIY Projects",
    description: "Simple science experiments and crafts using everyday household items.",
    path: "/dashboard/projects"
  },
  {
    icon: <Edit className="h-8 w-8 text-kidz-primary" />,
    title: "ABC & 123",
    description: "Engaging literacy and numeracy activities for early learners.",
    path: "/dashboard/early-learning"
  },
];

const Features = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  
  const handleFeatureClick = (path: string) => {
    if (!isLoggedIn) {
      navigate("/signin");
    } else {
      navigate(path);
    }
  };
  
  return (
    <section className="py-20 bg-white" id="features">
      <div className="kidz-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Extraordinary</span> Features
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            KidzSphere combines learning and play with intelligent suggestions to create a dynamic, engaging experience for children.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="kidz-card hover:border-kidz-primary group cursor-pointer"
              onClick={() => handleFeatureClick(feature.path)}
            >
              <div className="bg-kidz-light rounded-full p-4 inline-block mb-4 group-hover:bg-kidz-primary transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-kidz-dark transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

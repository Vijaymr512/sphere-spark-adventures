
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, BookOpen, Pencil, Lightbulb, Gamepad, Star, Award, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Features = () => {
  const features = [
    {
      icon: <Calendar className="h-12 w-12 text-kidz-primary" />,
      title: "Daily Activities",
      description: "Start each day with exciting suggested activities tailored to your child's interests. From simple crafts to outdoor adventures, we provide ideas to keep kids engaged and learning."
    },
    {
      icon: <Pencil className="h-12 w-12 text-kidz-primary" />,
      title: "Drawing Prompts",
      description: "Spark creativity with our imaginative drawing challenges. Each prompt encourages artistic expression while developing fine motor skills and visual thinking."
    },
    {
      icon: <BookOpen className="h-12 w-12 text-kidz-primary" />,
      title: "Story Time",
      description: "Discover a world of AI-generated stories featuring lovable characters and valuable lessons. Each story is unique and can be customized to include your child's interests."
    },
    {
      icon: <Lightbulb className="h-12 w-12 text-kidz-primary" />,
      title: "Brain Games",
      description: "Exercise growing minds with fun puzzles, riddles, and quizzes designed to develop critical thinking skills while entertaining."
    },
    {
      icon: <Gamepad className="h-12 w-12 text-kidz-primary" />,
      title: "Offline Games",
      description: "Balance screen time with suggestions for engaging offline activities that children can enjoy with friends and family."
    },
    {
      icon: <Star className="h-12 w-12 text-kidz-primary" />,
      title: "Roleplay Adventures",
      description: "Embark on interactive adventures where your child becomes the hero, making choices and solving problems in imaginative scenarios."
    },
    {
      icon: <Award className="h-12 w-12 text-kidz-primary" />,
      title: "DIY Projects",
      description: "Explore hands-on learning with simple science experiments and craft projects using common household items, complete with easy-to-follow instructions."
    },
    {
      icon: <Edit className="h-12 w-12 text-kidz-primary" />,
      title: "ABC & 123",
      description: "Make early learning fun with interactive alphabet and number activities designed to build a strong foundation for reading and math skills."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16 bg-kidz-background">
        <div className="kidz-container">
          <h1 className="text-4xl font-bold mb-8 gradient-text text-center">Features</h1>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 border-t-4 border-kidz-primary">
                <div className="flex items-center mb-4">
                  <div className="bg-kidz-light p-3 rounded-full">
                    {feature.icon}
                  </div>
                  <h2 className="text-2xl font-bold ml-4 text-kidz-dark">{feature.title}</h2>
                </div>
                <p className="text-gray-700 mb-4">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="bg-gradient-to-r from-kidz-primary to-kidz-dark rounded-lg p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to explore KidzSphere?</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Join thousands of families who are already enjoying our creative activities and educational content.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="secondary" className="bg-white text-kidz-dark hover:bg-gray-100">
                <Link to="/signup">Sign Up Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/dashboard">Try Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Features;

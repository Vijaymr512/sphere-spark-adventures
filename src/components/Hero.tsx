
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-kidz-background to-white overflow-hidden">
      <div className="kidz-container flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Learning & Play <span className="gradient-text">Reimagined</span> for Curious Kids!
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-700 max-w-xl">
              KidzSphere combines creative learning, fun activities, and intelligent suggestions to nurture growth and imagination.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-kidz-primary hover:bg-kidz-dark text-white text-lg px-8">
                <Link to="/signup">Get Started</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 border-kidz-primary hover:bg-kidz-light">
                <Link to="/features">Explore Features</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 relative">
          <div className="relative h-[400px] lg:h-[500px]">
            <div className="absolute top-0 left-0 w-[250px] h-[250px] lg:w-[300px] lg:h-[300px] bg-kidz-light rounded-full transform animate-float z-0"></div>
            <div className="absolute bottom-0 right-10 w-[200px] h-[200px] lg:w-[250px] lg:h-[250px] bg-kidz-secondary rounded-full transform animate-bounce-slow z-0"></div>
            <div className="absolute top-1/4 right-1/4 w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] bg-kidz-accent/30 rounded-full transform animate-pulse z-0"></div>
            
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="bg-white p-4 rounded-3xl shadow-xl transform rotate-3 animate-wiggle">
                <div className="border-4 border-kidz-primary rounded-2xl overflow-hidden">
                  <div className="bg-kidz-light py-3 px-4 flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-400"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                    <div className="h-3 w-3 rounded-full bg-green-400"></div>
                    <div className="ml-2 text-xs font-bold text-kidz-dark">KidzSphere App</div>
                  </div>
                  <div className="bg-white p-4 h-[300px] flex flex-col gap-3">
                    <div className="bg-kidz-light h-10 w-3/4 rounded-lg animate-pulse"></div>
                    <div className="bg-kidz-secondary h-6 w-1/2 rounded-lg animate-pulse delay-100"></div>
                    <div className="bg-kidz-light h-24 w-full rounded-lg mt-4 animate-pulse delay-200"></div>
                    <div className="flex gap-2 mt-2">
                      <div className="bg-kidz-primary h-8 w-20 rounded-lg animate-pulse delay-300"></div>
                      <div className="bg-kidz-accent h-8 w-20 rounded-lg animate-pulse delay-400"></div>
                    </div>
                    <div className="flex justify-end mt-auto">
                      <div className="bg-kidz-dark h-10 w-28 rounded-full animate-pulse delay-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

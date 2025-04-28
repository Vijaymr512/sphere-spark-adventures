
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ActivityCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  link: string;
}

const ActivityCard = ({ icon, title, description, color, link }: ActivityCardProps) => {
  return (
    <div className={`kidz-card overflow-hidden ${color}`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center mb-4">
          <div className="bg-white p-2 rounded-full shadow-md">
            {icon}
          </div>
          <h3 className="text-xl font-bold ml-3">{title}</h3>
        </div>
        <p className="text-gray-600 mb-6 flex-grow">{description}</p>
        <Button asChild variant="outline" className="border-kidz-primary hover:bg-kidz-light w-full">
          <Link to={link}>
            Explore
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ActivityCard;

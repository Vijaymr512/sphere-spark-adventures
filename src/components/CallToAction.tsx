
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-kidz-light via-white to-kidz-light">
      <div className="kidz-container">
        <div className="bg-gradient-to-r from-kidz-primary to-kidz-dark rounded-3xl p-8 md:p-12 lg:p-16 shadow-xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Spark Joy and Learning?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Join thousands of parents who've discovered the perfect balance of education and entertainment for their children.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-kidz-dark hover:bg-kidz-light text-lg px-8">
                <Link to="/signup">Start Free Trial</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white/20">
                <Link to="/features">Learn More</Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-white/80">
              No credit card required. Cancel anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;

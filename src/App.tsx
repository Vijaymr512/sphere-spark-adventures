
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Features from "./pages/Features";
import About from "./pages/About";
import DailyActivities from "./pages/DailyActivities";
import BedtimeStories from "./pages/BedtimeStories";
import Stories from "./pages/Stories";
import Games from "./pages/Games";
import OfflineGames from "./pages/OfflineGames";
import Adventures from "./pages/Adventures";
import Projects from "./pages/Projects";
import EarlyLearning from "./pages/EarlyLearning";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/daily-activities" element={<DailyActivities />} />
          <Route path="/dashboard/bedtime-stories" element={<BedtimeStories />} />
          <Route path="/dashboard/stories" element={<Stories />} />
          <Route path="/dashboard/games" element={<Games />} />
          <Route path="/dashboard/offline-games" element={<OfflineGames />} />
          <Route path="/dashboard/adventures" element={<Adventures />} />
          <Route path="/dashboard/projects" element={<Projects />} />
          <Route path="/dashboard/early-learning" element={<EarlyLearning />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

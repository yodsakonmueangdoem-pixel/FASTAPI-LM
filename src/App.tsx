import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import Index from "./pages/Index";
import { FlightPricePage } from "./pages/FlightPricePage";
import { DepressionPage } from "./pages/DepressionPage";
import { AnimalClassificationPage } from "./pages/AnimalClassificationPage";
import { MovieRecommendationPage } from "./pages/MovieRecommendationPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/flight" element={<FlightPricePage />} />
            <Route path="/depression" element={<DepressionPage />} />
            <Route path="/animal" element={<AnimalClassificationPage />} />
            <Route path="/movie" element={<MovieRecommendationPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

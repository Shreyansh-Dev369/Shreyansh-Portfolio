import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BackgroundVideo from "@/components/BackgroundVideo";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* ✅ BACKGROUND VIDEO (GLOBAL, BEHIND EVERYTHING) */}
        <BackgroundVideo videoSrc="background.mp4" />

        {/* ✅ GLOBAL UI */}
        <Toaster />
        <Sonner />

        {/* ✅ ROUTES (VERCEL SAFE) */}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

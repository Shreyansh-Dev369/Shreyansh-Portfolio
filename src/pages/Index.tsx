import { useState } from "react";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import SkillsTimeline from "@/components/SkillsTimeline";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";

const Index = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* ================= PRELOADER ================= */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* ================= MAIN SITE ================= */}
      {!loading && (
        <SmoothScroll>
          <div className="relative min-h-screen overflow-x-hidden">
            <CustomCursor />
            <Header />

            <main>
              <Hero />
              <About />
              <SkillsTimeline />
              <Projects />
              <Contact />
            </main>

            <Footer />
          </div>
        </SmoothScroll>
      )}
    </>
  );
};

export default Index;

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FlexibleStarField from "@/components/FlexibleStarField";
import PerformanceMatrics from "@/components/PerformanceMetrics";

const Index = () => {
  return (
    <div className="min-h-screen">
      {
        /* Star Field Background */
      }
      <FlexibleStarField
        showControls={true}
        initialConfig={{
          spawnRate: 0.3,
          maxStars: 50,
          starLifetime: 3000,
          animationSpeed: 1,
          glowIntensity: 0.8
        }}
      />
      <Navigation />
      <main>
        <Hero />
        <div id="about" >
          <About />
        </div>
        <div id="performance" >
          <PerformanceMatrics />
        </div>
        <div id="portfolio">
          <Portfolio />
        </div>
        <div id="contact">
          <Contact />
        </div>
        <div id="footer">
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Index;

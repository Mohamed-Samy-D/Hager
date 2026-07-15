import { Navbar } from "./components/Navbar/Navbar";
import { Hero } from "./components/Hero/Hero";
import { About } from "./components/About/About";
import { Gallery } from "./components/Gallery/Gallery";
import { LoveStory } from "./components/LoveStory/LoveStory";
import { Reasons } from "./components/Reasons/Reasons";
import { Letter } from "./components/Letter/Letter";
import { Footer } from "./components/Footer/Footer";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Gallery />
        <LoveStory />
        <Reasons />
        <Letter />
      </main>
      <Footer />
    </div>
  );
}
